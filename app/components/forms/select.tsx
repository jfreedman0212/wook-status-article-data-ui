import {ComponentPropsWithoutRef, forwardRef} from "react";
import {useFormField} from "~/components/forms/form-field-context";
import styles from "./input.module.css";

type SelectProps = Omit<ComponentPropsWithoutRef<'select'>, 'aria-invalid' | 'aria-errormessage' | 'className' | 'id' | 'required' | 'name'>;

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
    const fieldProps = useFormField();

    return (
        <select
            {...props}
            className={styles.input}
            {...fieldProps}
            ref={ref}
        />
    );
});
Select.displayName = 'Select';

export {Select};
