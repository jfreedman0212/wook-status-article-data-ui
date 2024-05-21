import {Nomination} from "~/models/nomination";
import DataGrid, {DataGridHandle} from 'react-data-grid';
import {forwardRef, UIEvent, useEffect, useState} from "react";
import {nominationColumns} from "./columns";
import styles from './nominations-table.module.css';
import {Link} from "~/components/links";

type NominationsTableProps = {
    nominations: Nomination[];
    onLoad: () => void;
};

const NominationsTable = forwardRef<DataGridHandle, NominationsTableProps>(({ nominations, onLoad }, ref) => {
    // by default, disable virtualization so all the columns and rows render on the server.
    // however, enable it once the page hydrates for performance reasons
    const [enableVirtualization, setEnableVirtualization] = useState(false);
    useEffect(() => setEnableVirtualization(true), []);

    return (
        <div className={styles.container}>
            <DataGrid
                ref={ref}
                className={`rdg-light ${styles.table}`}
                rowHeight={40}
                onScroll={(e) => {
                    if (isAtBottom(e)) {
                        onLoad();
                    }
                }}
                defaultColumnOptions={{ width: 'max-content', resizable: true }}
                enableVirtualization={enableVirtualization}
                renderers={{ noRowsFallback: <NoRows /> }}
                rowKeyGetter={rowKeyGetter}
                columns={nominationColumns}
                rows={nominations}
            />
        </div>
    );
});
NominationsTable.displayName = 'NominationsTable';

const NoRows = () => {
    return (
        <span className={styles.noRows}>
            <span>
                Either no nominations exist or none match your search criteria. Try <Link size='small' to='/admin/nominations/import'>importing a CSV file</Link> to add some.
            </span>
        </span>
    );
};

const isAtBottom = ({currentTarget}: UIEvent<HTMLDivElement>): boolean => {
    return currentTarget.scrollTop + 10 >= currentTarget.scrollHeight - currentTarget.clientHeight;
};

const rowKeyGetter = (row: Nomination) => row.id;

export { NominationsTable };
