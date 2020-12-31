import React, { useState } from 'react';

// Components
import Tab from './Tab';

// CSS
import styles from './Tabs.module.scss';

const Tabs = (props) => {
    const tabDefault = props.tabDefault || '';
    const [selectedTab, setSelectedTab] = useState(tabDefault);

    const tabHandler = (tab) => {
        setSelectedTab(tab);
    }

    let tabList = props.children.map(child => {
        const { label, icon, onlyIcon } = child.props;
        return (
            <Tab
                onlyIcon={onlyIcon}
                icon={icon}
                label={label}
                clicked={() => tabHandler(label)}
                activeTab={selectedTab}
                key={label}>{label}</Tab>
        )
    });

    let content = props.children.map(child => {
        if (child.props.label !== selectedTab) return null;
        return child.props.children;
    });

    return (
        <div className={styles.content}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {tabList}
                </ul>
            </nav>
            <section className={styles.tabContent}>
                {content}
            </section>
        </div>
    );
};

export default Tabs;