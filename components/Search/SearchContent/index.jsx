import React, { useEffect } from 'react';

// CSS
import styles from './SearchContent.module.scss';

const SearchContent = (props) => {
    let rows = null;
    let head = null;
    let paginationNumbers = null;
    let paginationItemClasses = [styles.item];

    if (props.head) {
        head = props.head.map((item, i) => {
            return (
                <th
                    key={item.name + i.toString()}
                    onClick={() => props.sortingData(item)}
                    className={styles.th}>
                    {item.name}
                </th>
            )
        });
    }

    if (props.data && props.data.length) {
        rows = props.data.map(item => {
            return (
                <tr className={styles.tr} key={item.id}>
                    <td className={styles.td}>
                        {item.language}
                    </td>
                    <td className={styles.td}>
                        {item.default_branch}
                    </td>
                    <td className={styles.td}>
                        {item.git_url}
                    </td>
                    <td className={styles.td}>
                        {item.name}
                    </td>
                    <td className={styles.td}>
                        {item.description}
                    </td>
                </tr>
            )
        });
    }

    // Setting pagination list
    if (props.paginationSetUp && props.data && props.data.length) {
        // Getting the amount of pages I need to paginate
        let amountOfItems = new Array(
            Math.ceil(props.paginationSetUp.totalItems / props.paginationSetUp.limit))
            .fill(null)
            .map((_, i) => i + 1);

        paginationNumbers = amountOfItems.map(item => {

            if (item === props.paginationSetUp.currentPage) {
                paginationItemClasses.push(styles.active);
            } else {
                paginationItemClasses = [styles.item];
            }

            return (
                <li
                    className={paginationItemClasses.join(' ')}
                    key={item}
                    onClick={() => props.paginationHandler(item)}
                    id={item}>
                    {item}
                </li>
            )
        });
    }

    return (
        <div>
            <div className={styles.tableContent}>
                {
                    props.data && props.data.length ? (
                        <table className={styles.table}>
                            <thead className={styles.thead}>
                                <tr className={styles.tr}>
                                    {head}
                                </tr>
                            </thead>
                            <tbody>
                                {props.paginationSetUp.limit ?
                                    rows.slice(0, props.paginationSetUp.limit) :
                                    rows }
                            </tbody>
                        </table>
                    ) : (
                        <p className={styles.noFound}>Data no found yet.</p>
                    )
                }
            </div>
            { props.data && props.data.length >= 5 &&
                <div className={styles.paginationContent}>
                    <ul className={styles.paginationList}>
                        {paginationNumbers}
                    </ul>
                </div>
            }
        </div>
    );
};

export default SearchContent;