import {ReactNode} from "react";
import styles from "./page-header.module.css";

type PageHeaderProps = {
    level?: 'h2' | 'h3';
    heading: string;
    children?: ReactNode;
    className?: string;
};

function PageHeader({ level = 'h2', heading, children, className }: PageHeaderProps) {
    const Heading = level;
    
    return (
        <header className={[styles.container, className].filter(x => !!x).join(' ')}>
            <Heading className={styles.heading}>{heading}</Heading>
            {children}
        </header>
    );
}

export {PageHeader};