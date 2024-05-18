import {forwardRef, ReactNode, useId} from "react";
import {FormFieldProvider, useFormField} from "~/components/forms/form-field-context";
import {CheckboxListContext} from "~/components/forms/checkbox/checkbox-list-context";
import styles from "../form-field.module.css";
import {Errors} from "~/components/forms/errors";
import {Hints} from "~/components/forms/hints";

type CheckboxListProps = {
    name: string;
    label: string;
    value: string[];
    onChange: (checkbox: string, checked: boolean) => void;
    required?: boolean;
    hint?: ReactNode | ReactNode[];
    children: ReactNode;
};

const CheckboxList = forwardRef<HTMLFieldSetElement, CheckboxListProps>(({ name, label, value, onChange, children, required, hint }, ref) => {
    const fieldId = `${useId()}__${name}`;
    
    return (
        <FormFieldProvider name={name} fieldId={fieldId} hint={hint} required={required}>
            <div className={styles.formField}>
                <Fieldset ref={ref} label={label}>
                    <CheckboxListContext.Provider value={{ value, onChange }}>
                        {children}
                    </CheckboxListContext.Provider>
                </Fieldset>
                <Errors />
                <Hints />
            </div>
        </FormFieldProvider>
    );
});
CheckboxList.displayName = 'CheckboxList';

const Fieldset = forwardRef<HTMLFieldSetElement, { children: ReactNode; label: string }>(({ children, label }, ref) => {
    const {
        required,
        ...ariaProps
    } = useFormField();
    
    return (
        <fieldset ref={ref} className={styles.formField} {...ariaProps}>
            <legend className={styles.label}>
                {label}{!required ? ' (Optional)' : null}
            </legend>
            {children}
        </fieldset>
    );
});
Fieldset.displayName = 'Fieldset';

export {CheckboxList};
