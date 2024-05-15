import {ReactNode} from "react";
import styles from "./page.module.css";

type PageProps = {
    children: ReactNode;
}

function Page({ children }: PageProps) {
    return (
        <section className={styles.page}>{children}</section>
    );
}

export { Page };
