import React from 'react';

// CSS
import styles from './Input.module.scss';

const Input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.input];

    switch (props.inputtype) {
        case ('input') :
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onKeyDown={props.keyDownHandler}
                onChange={props.changed} />;
            break;
        case ('textarea') :
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onKeyDown={props.keyDownHandler}
                onChange={props.changed} />;
            break;
        default :
            inputElement = <input
                onKeyDown={props.keyDownHandler}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />
            break;
    }
    return (
        <div className={styles.inputContent}>
            { props.label && <label>{props.label}</label> }
            {inputElement}
        </div>
    );
};

export default Input;