import React, { useEffect, useState } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

// Libs
import axios from 'axios';

// Components
import Tabs from '../components/UI/Tabs';
import Search from '../components/Search';
import UserForm from '../components/Forms/UserForm';
import UserList from '../components/UserList';
import { parseCookies } from '../helpers';

// CSS
import styles from './index.module.scss';

const Home = ({ data }) => {
    const [searchValue, setSearchValue] = useState('');
    const [gitUsersData, setGitUsersData] = useState([]);
    const [paginationSetUp, setPaginationSetUp] = useState({
        currentPage: 1,
        totalItems: 0,
        limit: 5
    });

    // Get data searched
    const searchRepoByUser = (query, pagination) => {
        let urlRequest = null;
        if (pagination) {
            console.log('paginarion')
            urlRequest = axios.get('https://api.github.com/users/' + query + '/repos',
                {
                    params: {
                        page: pagination.id,
                        per_page: paginationSetUp.limit
                    }
                })
        } else {
            urlRequest = axios.get('https://api.github.com/users/' + query + '/repos')
        }
        urlRequest.then(response => {
                if (!pagination) {
                    const paginationLimitUpdate = {
                        ...paginationSetUp
                    };
                    paginationLimitUpdate.totalItems = response.data.length;
                    setPaginationSetUp(paginationLimitUpdate);
                }
                setGitUsersData(response.data);
            })
            .catch(err => {
                setGitUsersData([]);
                console.log(err)
            });
    }

    // Getting page paginated
    const paginationHandler = (id) => {
        const paginationUpdated = {
            ...paginationSetUp
        };
        const pagination = { id };

        paginationUpdated.currentPage = id;
        console.log('pagination', paginationUpdated)
        setPaginationSetUp(paginationUpdated);
        searchRepoByUser(searchValue, pagination);
    }

    const headTableItems = [
        { name: 'Language' },
        { name: 'Default Branch' },
        { name: 'Git URL' },
        { name: 'Name' },
        { name: 'Description' }
    ];

    const inputSearchConfig = {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Search User\' Repository' 
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }

    // Search data
    const inputSearchHandler = (e) => {
        const value = e.target.value;
        setSearchValue(value)
        if (value.length >= 3) {
            searchRepoByUser(value);
        } else {
            searchRepoByUser('');
        }
    }

    // Cleaning Data when input is empty
    const keyDownHandler = (e) => {
        if (e.keyCode === 8 && !searchValue) {
            setGitUsersData([]);
        }
    }

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
                            data={gitUsersData}
                            keyDownHandler={keyDownHandler}
                            searchValue={searchValue}
                            inputSearchHandler={inputSearchHandler}
                            inputConfig={inputSearchConfig}
                            paginationSetUp={paginationSetUp}
                            paginationHandler={paginationHandler} />
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