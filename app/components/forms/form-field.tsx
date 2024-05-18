import {ReactNode, useId, useMemo} from "react";
import styles from "./form-field.module.css";
import {CrossCircledIcon, QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {FormFieldContext} from "~/components/forms/form-field-context";
import {useFieldValidationErrors} from "~/api/use-validation-errors";

type FormFieldProps = {
    name: string;
    label: ReactNode;
    children: ReactNode;
    required?: boolean;
    hint?: ReactNode | ReactNode[];
};

function FormField({name, label, children, required, hint}: FormFieldProps) {
    const fieldId = `${useId()}__${name}`;
    const errors = useFieldValidationErrors(name);
    const hasErrors = errors.length > 0;

    const contextValue = useMemo(() => ({
        name,
        fieldId,
        errorId: hasErrors ? `${fieldId}__error` : undefined,
        hintId: hint ? `${fieldId}__hint` : undefined,
        required
    }), [name, fieldId, hint, hasErrors, required]);

    let hints: ReactNode[] = [];
    if (hint instanceof Array) {
        hints = hint;
    } else if (hint) {
        hints = [hint];
    }

    return (
        <div className={styles.formField}>
            <label htmlFor={contextValue.fieldId} className={styles.label}>
                {label}{!required ? ' (Optional)' : null}
            </label>
            <FormFieldContext.Provider value={contextValue}>
                {children}
            </FormFieldContext.Provider>
            <div className={styles.messageList}>
                <div id={contextValue.errorId!} role='alert' className={styles.messageList}>
                    {errors.map((error, idx) => (
                        <span key={`${error}-${idx}`} className={styles.errorMessage}>
                            <CrossCircledIcon aria-hidden='true'/>
                            <span>{error}</span>
                        </span>
                    ))}
                </div>
                {hints.map((hint, idx) => (
                    <small key={`${hint}-${idx}`} className={styles.hint} id={contextValue.hintId!}>
                        <QuestionMarkCircledIcon aria-hidden='true'/>
                        <span>{hint}</span>
                    </small>
                ))}
            </div>
        </div>
    );
}

export {FormField};
