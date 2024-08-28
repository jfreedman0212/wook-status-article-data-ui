import {ReactNode} from "react";
import styles from './table.module.css';

type ColumnDefinition<TData> = {
    fieldName: (keyof TData & string) | 'row-number';
    header: ReactNode;
    render?: (value: TData) => ReactNode;
};

type TableProps<TKey, TData> = {
    columns: ColumnDefinition<TData>[];
    rowKey: TKey;
    rows: TData[];
};

function Table<TKey extends string, TData extends Record<Exclude<string, TKey>, unknown> & Record<TKey, string | number>>({ columns, rowKey, rows }: TableProps<TKey, TData>) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead className={styles.tableHead}>
                <tr className={styles.tableRow}>
                    {columns.map(column => (
                        <th key={column.fieldName} className={styles.tableHeader}>
                            {column.header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className={styles.tableBody}>
                {rows.map((row, index) => (
                    <tr key={row[rowKey]} className={styles.tableRow}>
                        {columns.map(({ fieldName, render = (value) => fieldName === 'row-number' ? index + 1 : value[fieldName] }) => (
                            <td key={fieldName} className={styles.tableData}>
                                {render(row) ?? <>&mdash;</>}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export {Table, type ColumnDefinition};