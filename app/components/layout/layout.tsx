import styles from "./layout.module.css";
import {ReactNode} from "react";
import {Form, NavLink} from "@remix-run/react";
import {Button} from "~/components/buttons";

type LayoutProps = {
    loggedInUser?: { name: string } | null;
    children: ReactNode;
};

function Layout({ loggedInUser, children }: LayoutProps) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleContainer}>
                    <h1>Wookieepedia Status Article Data</h1>
                    <nav className={styles.nav}>
                        <NavLink to='/'>Stats</NavLink>
                        {loggedInUser ? (
                            <NavLink to='/admin'>Admin</NavLink>
                        ) : null}
                    </nav>
                </div>
                {loggedInUser ? (
                    <Form action="/auth/logout" method="post">
                        Welcome, {loggedInUser.name}.&nbsp;
                        <Button variant='link'>Log Out</Button>
                    </Form>
                ) : (
                    <Form action="/auth/auth0" method="post">
                        <Button variant='link'>Log In</Button>
                    </Form>  
                )}
            </header>
            <main className={styles.main}>{children}</main>
        </div>
    );
}

export { Layout };
