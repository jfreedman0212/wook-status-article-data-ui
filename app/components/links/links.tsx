import {forwardRef} from "react";
import {NavLink as RemixNavLink, Link as RemixLink, LinkProps, NavLinkProps} from "@remix-run/react";
import styles from '../links.module.css';

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ className, ...props }, ref) => {
    const classNames = [styles.link, className].filter(x => x).join(' ');
    return <RemixLink className={classNames} {...props} ref={ref} />;
});
Link.displayName = 'Link';

const NavLink = forwardRef<HTMLAnchorElement, Omit<NavLinkProps, 'className'>>((props, ref) => {
    return (
        <RemixNavLink 
            className={({ isActive }) => isActive ? styles.activeLink : styles.link} 
            {...props}
            ref={ref}
        />
    );
});
NavLink.displayName = 'NavLink';

export { Link, NavLink };