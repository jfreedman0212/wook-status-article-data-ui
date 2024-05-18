import {useFormErrors} from "~/components/forms/form-field-context";
import styles from "~/components/forms/form-field.module.css";
import {CrossCircledIcon} from "@radix-ui/react-icons";

function Errors() {
    const {errors, errorId} = useFormErrors();

    return (
        <div id={errorId} role='alert' className={styles.messageList}>
            {errors.map((error, idx) => (
                <span key={`${error}-${idx}`} className={styles.errorMessage}>
                    <CrossCircledIcon aria-hidden='true'/>
                    <span>{error}</span>
                </span>
            ))}
        </div>
    );
}

export {Errors};
