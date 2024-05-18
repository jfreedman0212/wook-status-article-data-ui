import {useHints} from "~/components/forms/form-field-context";
import styles from "~/components/forms/form-field.module.css";
import {QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {ReactNode} from "react";

function Hint({ children }: { children: ReactNode }) {
    return (
        <small className={styles.hint}>
            <QuestionMarkCircledIcon aria-hidden='true'/>
            <span>{children}</span>
        </small>
    );
}

function Hints() {
    const {hints, hintId} = useHints();

    return (
        <div id={hintId} className={styles.messageList}>
            {hints.map((hint, idx) => <Hint key={`${hint}-${idx}`}>{hint}</Hint>)}
        </div>
    );
}

export { Hint, Hints };
