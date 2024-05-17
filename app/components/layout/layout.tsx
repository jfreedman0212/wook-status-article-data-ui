import styles from "./layout.module.css";
import {ReactNode} from "react";
import {Form} from "@remix-run/react";
import {Button} from "~/components/buttons";
import {Link} from "~/components/links";
import image from '~/assets/Site-logo.webp';

type LayoutProps = {
    loggedInUser?: { name: string } | null;
    children: ReactNode;
};

function Layout({ loggedInUser, children }: LayoutProps) {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleContainer}>
                    <Link to='https://starwars.fandom.com' referrerPolicy='no-referrer' target='_blank' rel="noreferrer">
                        <img
                            src={image}
                            height={75}
                            width={75}
                            alt='Wookieepedia logo: the Death Star from Star Wars with the text "Wookieepedia, the Star Wars Wiki."'
                        />
                    </Link>
                    <nav className={styles.nav}>
                        <Link to='/'>Stats</Link>
                        {loggedInUser ? (
                            <Link to='/admin'>Manage Data</Link>
                        ) : (
                            <Form action="/auth/auth0" method="post">
                                <Button variant='link'>Manage Data</Button>
                            </Form>
                        )}
                    </nav>
                </div>
                {loggedInUser ? (
                    <Form action="/auth/logout" method="post" className={styles.user}>
                        <span>Welcome, {loggedInUser.name}.</span>
                        <Button variant='link'>Log Out</Button>
                    </Form>
                ) : null}
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}

export { Layout };
