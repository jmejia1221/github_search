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
                keyDownHandler={(e) => props.keyDownHandler(e, 'search')}
                inputtype={props.inputConfig.elementType}
                value={props.searchValue}
                changed={props.inputSearchHandler}
                elementConfig={props.inputConfig.elementConfig} />
            <div>
                {props.children}
            </div>
            <div>
                <SearchContent
                    sortingData={props.sortingData}
                    filterSearchedDataHandler={props.filterSearchedDataHandler}
                    paginationHandler={props.paginationHandler}
                    paginationSetUp={props.paginationSetUp}
                    head={props.head}
                    data={props.data} />
            </div>
        </div>
    );
};

export default Search;