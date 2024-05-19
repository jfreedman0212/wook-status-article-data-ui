import {forwardRef} from "react";
import {
    NavLink as RemixNavLink,
    Link as RemixLink,
    LinkProps as RemixLinkProps,
    NavLinkProps as RemixNavLinkProps
} from "@remix-run/react";
import styles from "../buttons-and-links.module.css";

type BaseLinkProps = {
    variant?: 'primary' | 'secondary' | 'destructive' | 'link' | 'navLink';
    size?: 'normal' | 'small';
};

type LinkProps = BaseLinkProps & Omit<RemixLinkProps, 'className'>;

const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ variant = 'link', size = 'normal', ...props }, ref) => {
    const classNames = [styles[variant], size === 'small' ? styles.small : null].filter(x => !!x).join(' ');
    return <RemixLink className={classNames} {...props} ref={ref} />;
});
Link.displayName = 'Link';

type NavLinkProps = Omit<RemixNavLinkProps, 'className'>;

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>((props, ref) => {
    return (
        <RemixNavLink 
            className={({ isActive }) => isActive ? styles.activeLink : styles.navLink} 
            {...props}
            ref={ref}
        />
    );
});
NavLink.displayName = 'NavLink';

export { Link, NavLink };