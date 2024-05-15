import {ReactNode} from "react";
import styles from "./page-header.module.css";

type PageHeaderProps = {
    heading: string;
    children?: ReactNode;
};

function PageHeader({ heading, children }: PageHeaderProps) {
    return (
        <header className={styles.container}>
            <h2 className={styles.heading}>{heading}</h2>
            {children}
        </header>
    );
}

export {PageHeader};