import {forwardRef, ReactNode} from "react";
import {useFormField} from "~/components/forms/form-field-context";
import styles from "./checkbox.module.css";
import {useCheckboxList} from "~/components/forms/checkbox/checkbox-list-context";

type CheckboxProps = {
    value: string;
    label: ReactNode;
    disabled?: boolean;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ value, label, disabled }, ref) => {
    const { id, name } = useFormField();
    const checkboxId = `${id}__${value}`;
    const { value: listValue, onChange } = useCheckboxList();
    
    return (
        <div className={styles.checkboxContainer}>
            <input
                id={checkboxId}
                type='checkbox'
                name={name}
                value={value}
                className={styles.checkboxControl}
                disabled={disabled}
                checked={listValue.includes(value)}
                onChange={(event) => onChange(value, event.target.checked)}
                ref={ref}
            />
            <label htmlFor={checkboxId} className={styles.checkboxLabel}>{label}</label>
        </div>
    )
});
Checkbox.displayName = 'Checkbox';

export {Checkbox};
