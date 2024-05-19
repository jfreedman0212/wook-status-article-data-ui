import {ReactNode} from "react";
import styles from './cards.module.css'; 

type CardProps = {
    size?: 'large' | 'small';
    children: ReactNode;
    name: string;
};

function Card({ size = 'large', children, name }: CardProps) {
    const colorClass = stringToColor(name);

    return (
        <li className={`${styles.card} ${styles[size]} ${styles[colorClass]}`}>
            {children}
        </li>
    );
}

function stringToColor(inputString: string): string {
    const colors = [
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
