import {forwardRef, ReactNode, useId} from "react";
import {useFieldValidationErrors} from "~/api/use-validation-errors";
import {FormFieldContext} from "~/components/forms/form-field-context";
import {CheckboxListContext} from "~/components/forms/checkbox/checkbox-list-context";
import styles from "./checkbox-list.module.css";

type CheckboxListProps = {
    name: string;
    label: string;
    value: string[];
    onChange: (checkbox: string, checked: boolean) => void;
    children: ReactNode;
};

const CheckboxList = forwardRef<HTMLFieldSetElement, CheckboxListProps>(({ name, label, value, onChange, children }, ref) => {
    const fieldId = `${useId()}__${name}`;
    const errors = useFieldValidationErrors(name);
    const hasErrors = errors.length > 0;

    const contextValue = {
        name,
        fieldId,
        errorId: hasErrors ? `${fieldId}__error` : undefined
    };
    
    return (
        <fieldset ref={ref} className={styles.fieldset}>
            <legend className={styles.legend}>{label}</legend>
            <FormFieldContext.Provider value={contextValue}>
                <CheckboxListContext.Provider value={{ value, onChange }}>
                    {children}
                </CheckboxListContext.Provider>
            </FormFieldContext.Provider>
            {/* TODO: errors and hints! */}
        </fieldset>
    );
});
CheckboxList.displayName = 'CheckboxList';

export { CheckboxList };
