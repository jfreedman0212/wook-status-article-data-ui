import {ComponentPropsWithoutRef, forwardRef} from "react";
import styles from "./button.module.css"; 

type ButtonProps = {
    variant?: 'link' | 'main';
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'main', ...rest }, ref) => {
    const classNames = [styles.button, styles[variant]];
    
    return (
        <button className={classNames.join(' ')} {...rest} ref={ref} />
    );
});

Button.displayName = 'Button';

export { Button };
