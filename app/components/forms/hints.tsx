import {useHints} from "~/components/forms/form-field-context";
import styles from "~/components/forms/form-field.module.css";
import {QuestionMarkCircledIcon} from "@radix-ui/react-icons";

function Hints() {
    const { hints, hintId } = useHints();
    
    return (
        <div id={hintId} className={styles.messageList}>
            {hints.map((hint, idx) => (
                <small key={`${hint}-${idx}`} className={styles.hint}>
                    <QuestionMarkCircledIcon aria-hidden='true'/>
                    <span>{hint}</span>
                </small>
            ))}
        </div>
    );
}

export { Hints };
