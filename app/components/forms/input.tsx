import {ComponentPropsWithoutRef, forwardRef} from "react";
import {useFormField} from "~/components/forms/form-field-context";
import styles from "./input.module.css";

type TextInputType =
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'date';

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'aria-invalid' | 'aria-errormessage' | 'className' | 'id' | 'type' | 'required'>
    & { type?: TextInputType };

const Input = forwardRef<HTMLInputElement, InputProps>(({type = 'text', ...props}, ref) => {
    const fieldProps = useFormField();

    return (
        <input
            {...props}
            type={type}
            className={styles.input}
            {...fieldProps}
            ref={ref}
        />
    );
});
Input.displayName = 'Input';

export {Input, type InputProps};
