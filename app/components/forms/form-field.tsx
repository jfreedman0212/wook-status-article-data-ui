import {ReactNode, useId} from "react";
import styles from "./form-field.module.css";
import {FormFieldProvider} from "~/components/forms/form-field-context";
import {Hints} from "~/components/forms/hints";
import {Errors} from "~/components/forms/errors";

type FormFieldProps = {
    name: string;
    label: ReactNode;
    children: ReactNode;
    required?: boolean;
    hint?: ReactNode | ReactNode[];
};

function FormField({name, label, children, required, hint}: FormFieldProps) {
    const fieldId = `${useId()}__${name}`;

    return (
        <FormFieldProvider name={name} fieldId={fieldId} hint={hint} required={required}>
            <div className={styles.formField}>
                <label htmlFor={fieldId} className={styles.label}>
                    {label}{!required ? ' (Optional)' : null}
                </label>
                {children}
                <Errors />
                <Hints />
            </div>
        </FormFieldProvider>
    );
}

export {FormField};
