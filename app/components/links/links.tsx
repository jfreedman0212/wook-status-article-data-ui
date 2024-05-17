import {forwardRef} from "react";
import {
    NavLink as RemixNavLink,
    Link as RemixLink,
    LinkProps as RemixLinkProps,
    NavLinkProps as RemixNavLinkProps
} from "@remix-run/react";
import styles from "../buttons-and-links.module.css";

type BaseLinkProps = {
    variant?: 'primary' | 'secondary' | 'destructive' | 'link';
};

type LinkProps = BaseLinkProps & Omit<RemixLinkProps, 'className'>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ variant = 'link', ...props }, ref) => {
    return <RemixLink className={styles[variant]} {...props} ref={ref} />;
});
Link.displayName = 'Link';

type NavLinkProps = BaseLinkProps & Omit<RemixNavLinkProps, 'className'>;

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ variant = 'link', ...props }, ref) => {
    return (
        <RemixNavLink 
            className={({ isActive }) => isActive ? styles.activeLink : styles[variant]} 
            {...props}
            ref={ref}
        />
    );
});
NavLink.displayName = 'NavLink';

export { Link, NavLink };