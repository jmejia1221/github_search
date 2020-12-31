import React, { useState } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

// Components
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import UserForm from '../components/UserForm';

// CSS
import styles from './index.module.scss';

const Home = () => {

    return (
        <section className={styles.main}>
            <aside>
                <Tabs tabDefault="users"> 
                    <div label="users" icon={faUserPlus} onlyIcon> 
                        <h2 className={styles.title}>Add User</h2>
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

export default Home;