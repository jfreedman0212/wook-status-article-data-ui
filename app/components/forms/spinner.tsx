import styles from "./spinner.module.css";
import {UpdateIcon} from "@radix-ui/react-icons";

function Spinner() {
    return <UpdateIcon className={styles.spinner} aria-hidden />;
}

export { Spinner };
