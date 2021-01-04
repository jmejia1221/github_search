import React, { useState } from 'react';

// Libs
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

// Components
import Tabs from '../components/UI/Tabs';
import Search from '../components/Search';
import UserForm from '../components/Forms/UserForm';
import UserList from '../components/UserList';
import Input from '../components/UI/Input';
import { parseCookies } from '../helpers';

// CSS
import styles from './index.module.scss';

const headTableItems = [
    { name: 'Language', value: 'language' },
    { name: 'Default Branch', value: 'default_branch' },
    { name: 'Git URL', value: 'git_url' },
    { name: 'Name', value: 'name' },
    { name: 'Description', value: 'description' }
];

const inputSearchConfig = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'Search User\' Repositories' 
    },
    value: '',
    validation: {
        required: true
    },
    valid: false,
    touched: false
};

const inputFilterConfig = {
    elementType: 'input',
    elementConfig: {
        type: 'text',
        placeholder: 'Search Repository' 
    },
    value: '',
    validation: {
        required: true
    },
    valid: false,
    touched: false
};

const Home = ({ data }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchFilterValue, setSearchFilterValue] = useState('');
    const [gitUsersData, setGitUsersData] = useState([]);
    const [getSortingType, setGetSortingType] = useState('');
    // This alternated data is for repositories'filter
    // to keep all the data even if it is paginated
    const [alternatedData, setAlternatedData] = useState([]);
    const [paginationSetUp, setPaginationSetUp] = useState({
        currentPage: 1,
        totalItems: 0,
        limit: 5
    });

    // Get data searched
    const searchRepoByUser = (query, pagination, sorting) => {
        let params = {};

        // Keeping item selected in the pagination
        if (paginationSetUp.currentPage !== 1 && !pagination) {
            pagination = {id: paginationSetUp.currentPage};
        }

        if (!pagination && sorting) {
            params['sort'] = sorting ? sorting.value : '';
            setGetSortingType(sorting.name);
        }

        if (!pagination && !sorting) {
            setGetSortingType('');
        }

        if (pagination) {
            params['page'] = pagination.id;
            params['per_page'] = paginationSetUp.limit;
        }

        axios.get('https://api.github.com/users/' + query + '/repos', {
            params: params
        })
        .then(response => {
            if (!pagination) {
                const paginationLimitUpdate = {
                    ...paginationSetUp
                };
                paginationLimitUpdate.totalItems = response.data.length;
                setPaginationSetUp(paginationLimitUpdate);

                // Alternated data for respositories' filter
                setAlternatedData(response.data);
            }
            setGitUsersData(response.data);
        })
        .catch(err => {
            setGitUsersData([]);
            console.log('No data found');
        });
    }

    // Getting repositories filtered
    const searchByRepo = (query) => {
        const copiedCurrentUserData = [...alternatedData];
        if (query.length >= 3) {
            const filteredRepos = copiedCurrentUserData.filter(repo => {
                return repo.name.toLowerCase().includes(query.toLowerCase());
            });
            setGitUsersData(filteredRepos);
        }
    };

    // Getting query to filter repositories
    const searchFilterHandler = (e) => {
        const value = e.target.value;
        setSearchFilterValue(value);
        searchByRepo(value);
    }

    // Getting page paginated
    const paginationHandler = (id) => {
        const paginationUpdated = {
            ...paginationSetUp
        };
        const pagination = { id };

        paginationUpdated.currentPage = id;
        setPaginationSetUp(paginationUpdated);
        searchRepoByUser(searchValue, pagination);
    }

    // Search data
    const inputSearchHandler = (e) => {
        const value = e.target.value;
        setSearchValue(value)
        searchRepoByUser(value);
    }

    // Cleaning Data when input is empty
    const keyDownHandler = (e, inputId) => {
        if (e.keyCode === 8
            && !searchValue
            && inputId === 'search') {
            setGitUsersData([]);
        }
        if (e.keyCode === 8
            && searchFilterValue.length <= 3
            && inputId === 'filter') {
            searchRepoByUser(searchValue);
        }
    }

    // Sorting table
    const sortingData = (type) => {
        const sorting = type
        searchRepoByUser(searchValue, null, sorting);
    }

    // Remove sort
    const removeSortHanlder = () => {
        searchRepoByUser(searchValue);
    }

    // Rendering users according to data saved in the Cookie
    let users = null;
    if (data.user) {
        users = <UserList user={JSON.parse(data.user)} />;
    }

    return (
        <section className={styles.main}>
            <aside>
                <Tabs tabDefault="users"> 
                    <div label="users" icon={faUserPlus} onlyIcon> 
                        <h2 className={styles.title}>Add User</h2>
                        {users}
                        <UserForm />
                    </div> 
                    <div label="repositories" icon={faGithubAlt} onlyIcon> 
                        <h2 className={styles.title}>Search User's Repositories</h2>
                        <Search
                            head={headTableItems}
                            sortingData={sortingData}
                            data={gitUsersData}
                            keyDownHandler={keyDownHandler}
                            searchValue={searchValue}
                            inputSearchHandler={inputSearchHandler}
                            inputConfig={inputSearchConfig}
                            paginationSetUp={paginationSetUp}
                            paginationHandler={paginationHandler}>
                            {/* Filter content */}
                            { gitUsersData.length ? (
                                <div className={styles.filterContent}>
                                    <div className={styles.sortContent}>
                                        { getSortingType && (
                                            <span
                                                onClick={removeSortHanlder}
                                                className={styles.sortTag}>
                                                { getSortingType }
                                                <FontAwesomeIcon
                                                    className={styles.icon}
                                                    icon={faTimes} />
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.filterSearchInput}>
                                        <span className={styles.filterTitle}>Filter: </span>
                                        <Input
                                            keyDownHandler={(e) => keyDownHandler(e, 'filter')}
                                            inputtype={inputFilterConfig.elementType}
                                            value={searchFilterValue}
                                            changed={searchFilterHandler}
                                            elementConfig={inputFilterConfig.elementConfig} />
                                    </div>
                                </div>
                            ) : null}
                        </Search>
                    </div> 
                </Tabs> 
            </aside>
        </section>
    );
};

Home.getInitialProps = async ({ req }) => {
    const data = parseCookies(req);

    return { 
        data: data && data
    }
}

export default Home;