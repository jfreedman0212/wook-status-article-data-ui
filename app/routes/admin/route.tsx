import {Outlet} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {NavLink} from "~/components/links";
import styles from "./admin-layout.module.css";

export default function Admin() {
    return (
        <section className={styles.page}>
            <PageHeader heading='Manage Data' className={styles.pageHeader} />
            <nav className={styles.nav}>
                <NavLink to='projects'>Projects</NavLink>
                <NavLink to='nominators'>Nominators</NavLink>
                <NavLink to='nominations'>Nominations</NavLink>
            </nav>
            <div className={styles.content}>
                <Outlet/>
            </div>
        </section>
    );
}
