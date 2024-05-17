import {ReactNode} from "react";
import styles from './cards.module.css';

type CardListProps = {
    children: ReactNode;
};

function CardList({ children }: CardListProps) {
    return (
        <ul className={styles.cardList}>
            {children}
        </ul>
    );
}

export { CardList };
