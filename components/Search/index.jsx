import React from 'react';

// CSS
import styles from './Search.module.scss';

// Components
import Input from '../UI/Input';
import SearchContent from './SearchContent';

const Search = (props) => {

    return (
        <div className={styles.searchContent}>
            <Input
                keyDownHandler={props.keyDownHandler}
                inputtype={props.inputConfig.elementType}
                value={props.searchValue}
                changed={props.inputSearchHandler}
                elementConfig={props.inputConfig.elementConfig} />
            <div>
                <SearchContent
                    paginationHandler={props.paginationHandler}
                    paginationSetUp={props.paginationSetUp}
                    head={props.head}
                    data={props.data} />
            </div>
        </div>
    );
};

export default Search;