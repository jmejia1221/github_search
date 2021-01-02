import React from 'react';

// CSS
import styles from './UserList.module.scss';

const UserList = (props) => {

    return (
        <ul className={styles.UserList}>
            <li className={styles.item}>
                <div>
                    <strong>Name: </strong>
                    <span>{props.user.name}</span>
                </div>
                <div>
                    <strong>Last Name: </strong>
                    <span>{props.user.lastName}</span>
                </div>
            </li>
            <li className={styles.item}>
                <div>
                    <strong>Nit: </strong>
                    <span>{props.user.nit}</span>
                </div>
                <div>
                    <strong>Birthday: </strong>
                    <span>{props.user.birthday}</span>
                </div>
            </li>
            <li className={styles.item}>
                <div>
                    <strong>Email: </strong>
                    <span>{props.user.email}</span>
                </div>
                <div>
                    <strong>Github's User: </strong>
                    <span>{props.user.github}</span>
                </div>
            </li>
        </ul>
    );
};

export default UserList;