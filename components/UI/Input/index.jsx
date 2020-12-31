import React from 'react';

// CSS
import styles from './Input.module.scss';

const Input = (props) => {
    console.log('props', props)
    let inputElement = null;
    const inputClasses = [styles.input];

    switch (props.inputtype) {
        case ('input') :
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea') :
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default :
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} />
            break;
    }
    return (
        <div className="Input">
            { props.label && <label className="Label">{props.label}</label> }
            {inputElement}
        </div>
    );
};

export default Input;