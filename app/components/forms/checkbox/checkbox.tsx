import {forwardRef, ReactNode} from "react";
import {useFormField} from "~/components/forms/form-field-context";
import checkboxStyles from "./checkbox.module.css";
import {useCheckboxList} from "~/components/forms/checkbox/checkbox-list-context";
import {Hint} from "~/components/forms/hints";
import styles from "../form-field.module.css";

type CheckboxProps = {
    value: string;
    label: ReactNode;
    disabled?: boolean;
    hint?: ReactNode;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ value, label, disabled, hint }, ref) => {
    const { id, name } = useFormField();
    const checkboxId = `${id}__${value}`;
    const hintId = `${checkboxId}__hints`;
    const { value: listValue, onChange } = useCheckboxList();
    
    return (
        <div className={checkboxStyles.checkboxContainer}>
            <input
                id={checkboxId}
                type='checkbox'
                name={name}
                value={value}
                className={checkboxStyles.checkboxControl}
                disabled={disabled}
                checked={listValue.includes(value)}
                onChange={(event) => onChange(value, event.target.checked)}
                aria-describedby={hintId}
                ref={ref}
            />
            <label htmlFor={checkboxId} className={checkboxStyles.checkboxLabel}>{label}</label>
            <div id={hintId} className={styles.messageList}>
                {hint ? <Hint>{hint}</Hint> : null}
            </div>
        </div>
    )
});
Checkbox.displayName = 'Checkbox';

export {Checkbox};
