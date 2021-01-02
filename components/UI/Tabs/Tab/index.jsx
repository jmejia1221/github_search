import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

// CSS
import styles from './Tab.module.scss';

const Tab = (props) => {
    let tabClasses = [styles.item];

    if (props.activeTab === props.label) {
        tabClasses.push(styles.active)
    }

    return (
        <li
            className={tabClasses.join(' ')}
            onClick={props.clicked}>
            <FontAwesomeIcon icon={props.icon} />
            {props.onlyIcon ? null : props.label}
        </li>
    )
}

export default Tab;