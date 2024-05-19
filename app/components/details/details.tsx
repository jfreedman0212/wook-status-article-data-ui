import {forwardRef, ReactNode} from "react";
import styles from "./details.module.css";

type DetailsProps = {
    children: ReactNode;
};

const Details = forwardRef<HTMLDetailsElement, DetailsProps>(({ children }, ref) => {
    return (
        <details ref={ref} className={styles.details}>{children}</details>
    );
});
Details.displayName = 'Details';

type SummaryProps = {
    children: ReactNode;
};

const Summary = forwardRef<HTMLElement, SummaryProps>(({ children }, ref) => {
    return (
        <summary ref={ref} className={styles.summary}>{children}</summary>
    );
});
Summary.displayName = 'Summary';

export { Details, Summary };
