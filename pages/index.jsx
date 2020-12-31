import React, { useState } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons';

// Components
import Tabs from '../components/Tabs';

// CSS
import styles from './index.module.scss';

const Home = () => {
    return (
        <section className={styles.main}>
            <aside>
                <Tabs tabDefault="users"> 
                    <div label="users" icon={faUserPlus} onlyIcon> 
                        users
                    </div> 
                    <div label="repositories" icon={faGithubAlt} onlyIcon> 
                        search Repo
                    </div> 
                </Tabs> 
            </aside>
        </section>
    );
};

export default Home;