import {forwardRef, ReactNode, useId, useMemo} from "react";
import {FormFieldProvider, useFormField} from "~/components/forms/form-field-context";
import {CheckboxListContext} from "~/components/forms/checkbox/checkbox-list-context";
import formFieldStyles from "../form-field.module.css";
import styles from "./checkbox-list.module.css";
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
    
    const checkboxContext = useMemo(() => ({ value, onChange }), [value, onChange])
    
    return (
        <FormFieldProvider name={name} fieldId={fieldId} hint={hint} required={required}>
            <div className={formFieldStyles.formField}>
                <Fieldset ref={ref} label={label}>
                    <CheckboxListContext.Provider value={checkboxContext}>
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
        <fieldset ref={ref} className={styles.fieldset} {...ariaProps}>
            <legend className={styles.legend}>
                {label}{!required ? ' (Optional)' : null}
            </legend>
            {children}
        </fieldset>
    );
});
Fieldset.displayName = 'Fieldset';

export {CheckboxList};
