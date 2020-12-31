import React from 'react';

// CSS
import styles from './Button.module.scss';

const Button = (props) => {
    return (
        <button
            onClick={props.clicked}
            className={styles.button}>
            {props.children}
        </button>
    );
};

export default Button;