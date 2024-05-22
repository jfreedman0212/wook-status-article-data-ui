import {ReactNode} from "react";
import styles from './cards.module.css'; 

type CardColor =
    | 'red'
    | 'blue'
    | 'green'
    | 'orange'
    | 'gray'
    | 'pink'
    | 'purple'
    | 'yellow';

type CardProps = {
    size?: 'large' | 'small';
    children: ReactNode;
    name: string;
    color?: CardColor;
    standalone?: boolean;
};

function Card({ size = 'large', children, name, color = stringToColor(name), standalone = false }: CardProps) {
    const Component = standalone ? 'div' : 'li';

    return (
        <Component className={`${styles.card} ${styles[size]} ${styles[color]}`}>
            {children}
        </Component>
    );
}

function stringToColor(inputString: string): CardColor {
    const colors: CardColor[] = [
        'red',
        'blue',
        'green',
        'orange',
        'gray',
        'pink',
        'purple',
        'yellow'
    ];
    let hash = 0;

    for (let i = 0; i < inputString.length; i++) {
        hash = inputString.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Use absolute value of hash number to avoid negative indices
    // Use modulo operation to fit number within colors array length
    const index = Math.abs(hash) % colors.length;

    return colors[index];
}

export { Card };
