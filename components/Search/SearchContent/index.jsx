import React from 'react';

// CSS
import styles from './SearchContent.module.scss';

const SearchContent = (props) => {
    let rows = null;
    let head = null;

    if (props.head) {
        head = props.head.map((item, i) => {
            return (
                <th
                    key={item.name + i.toString()}
                    className={styles.th}>
                    {item.name}
                </th>
            )
        });
    }

    if (props.data) {
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
                                {rows}
                            </tbody>
                        </table>
                    ) : (
                        <p className={styles.noFound}>Data no found</p>
                    )
                }
            </div>
        </div>
    );
};

export default SearchContent;