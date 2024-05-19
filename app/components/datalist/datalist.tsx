import {forwardRef, ReactNode} from "react";
import styles from "./datalist.module.css";

type DatalistProps = {
    children: ReactNode;
}

const Datalist = forwardRef<HTMLDListElement, DatalistProps>(({ children }, ref) => {
    return (
        <dl ref={ref} className={styles.datalist}>{children}</dl>
    );
});
Datalist.displayName = 'Datalist';

export { Datalist };
