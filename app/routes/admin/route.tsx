import {Outlet} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {Link, NavLink} from "~/components/links";
import styles from "./admin-layout.module.css";
import {UploadIcon} from "@radix-ui/react-icons";

export default function Admin() {
    return (
        <section className={styles.page}>
            <PageHeader heading='Manage Data' className={styles.pageHeader}>
                <Link variant='secondary' to='/admin/nominations/import'>
                    <UploadIcon aria-hidden />
                    Upload CSV
                </Link>
            </PageHeader>
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
