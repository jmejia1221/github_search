import React, { useEffect, useState } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

// Components
import Tabs from '../components/UI/Tabs';
import Search from '../components/Search';
import UserForm from '../components/Forms/UserForm';
import UserList from '../components/UserList';
import { parseCookies } from '../helpers';

// CSS
import styles from './index.module.scss';

const Home = ({ data }) => {

    console.log('data', data.user)
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
                        <Search />
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