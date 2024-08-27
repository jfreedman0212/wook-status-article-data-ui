import {ReactNode} from "react";
import styles from './nested-nav-layout.module.css';
import {PageHeader} from "~/components/layout/page-header";
import {NavLink} from "~/components/links";
import {Outlet} from "@remix-run/react";

interface NestedNavLayoutProps {
    heading: string;
    children?: ReactNode;
    navItems: { to: string; label: string; }[];
}

function NestedNavLayout({ heading, children, navItems }: NestedNavLayoutProps) {
    return (
        <section className={styles.page}>
            <PageHeader heading={heading} className={styles.pageHeader}>{children}</PageHeader>
            <nav className={styles.nav}>
                {navItems.map((item) => <NavLink key={item.to} to={item.to}>{item.label}</NavLink>)}
            </nav>
            <div className={styles.content}>
                <Outlet />
            </div>
        </section>
    );
}

export {NestedNavLayout};
