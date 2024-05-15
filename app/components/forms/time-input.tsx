import {forwardRef} from "react";
import {useFormField} from "~/components/forms/form-field-context";
import styles from "./input.module.css";
import {IMaskInput} from "react-imask";
import IMask from "imask";

type TimeInputProps = {
    defaultValue?: string;
    value?: string;
    onChange?: (value?: string) => void;
    onBlur?: () => void;
};

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(({onChange, ...props}, ref) => {
    const fieldProps = useFormField();

    return (
        <IMaskInput
            className={styles.input}
            {...fieldProps}
            {...props}
            onAccept={onChange ? (value) => onChange(value) : undefined}
            mask="hh:mm"
            blocks={{
                'hh': {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 23,
                    placeholderChar: 'h'
                },
                'mm': {
                    mask: IMask.MaskedRange,
                    from: 0,
                    to: 59,
                    placeholderChar: 'm'
                }
            }}
            placeholder='hh:mm'
            lazy
            autofix
            ref={ref}
        />
    );
});
TimeInput.displayName = 'TimeInput';

export {TimeInput};
