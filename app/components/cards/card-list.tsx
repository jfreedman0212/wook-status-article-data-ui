import {ReactNode} from "react";
import styles from './cards.module.css';

type CardListProps = {
    children: ReactNode;
    direction?: 'horizontal' | 'vertical'
};

function CardList({ direction = 'horizontal', children }: CardListProps) {
    return (
        <ul className={`${styles.cardList} ${styles[direction]}`}>
            {children}
        </ul>
    );
}

export { CardList };
