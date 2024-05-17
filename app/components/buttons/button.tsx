import {ComponentPropsWithoutRef, forwardRef} from "react";
import styles from "../buttons-and-links.module.css";

type ButtonProps = {
    variant?: 'primary' | 'secondary' | 'destructive' | 'link';
} & Omit<ComponentPropsWithoutRef<'button'>, 'className'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ variant = 'primary', type = 'button', ...rest }, ref) => {
    const classNames = [styles[variant]];
    
    return (
        <button type={type} className={classNames.join(' ')} {...rest} ref={ref} />
    );
});
Button.displayName = 'Button';

export { Button };
