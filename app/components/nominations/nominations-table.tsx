import {Nomination} from "~/models/nomination";
import {nominationColumns} from "./columns";
import {Link} from "~/components/links";
import {Table} from "~/components/table";
import {Button} from "~/components/buttons";

type NominationsTableProps = {
    nominations: Nomination[];
    loading: boolean;
    hasReachedEnd: boolean;
    onLoad: () => void;
};

const NominationsTable = ({ nominations, loading, hasReachedEnd, onLoad }: NominationsTableProps) => {
    if (nominations.length === 0) {
        return (
            <span>
                Either no nominations exist or none match your search criteria.
                Try <Link size='small' to='/admin/nominations/import'>importing a CSV file</Link> to add some.
            </span>
        );
    }

    return (
        <>
            <Table columns={nominationColumns} rowKey='id' rows={nominations}/>
            {!hasReachedEnd ? (
                <Button variant='secondary' onClick={() => onLoad()} disabled={loading}>
                    {loading ? 'Loading...' : 'Load more'}
                </Button>
            ) : null}
        </>
    );
}


export {NominationsTable};
