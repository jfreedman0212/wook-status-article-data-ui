import {LoaderFunction} from "@remix-run/node";
import {PageHeader} from "~/components/layout";
import {fetchAwardGenerationGroups} from "~/api/awards-api.server";
import {Link} from "~/components/links";
import {Time} from "~/components/time";
import {useAwardGenerationGroups} from "~/api/awards-hooks";
import {Table} from "~/components/table";

export const loader: LoaderFunction = async ({ request }) => {
    return await fetchAwardGenerationGroups(request);
};

export default function Awards() {
    const groups = useAwardGenerationGroups();

    return (
        <>
            <PageHeader heading='Awards' level='h3'>
                <Link variant='secondary' to='new'>Generate Awards</Link>
            </PageHeader>
            <Table
                columns={[
                    {
                        fieldName: 'name',
                        header: 'Name',
                        render(row) {
                            return <Link to={`${row.id}`}>{row.name}</Link>
                        }
                    },
                    {
                        fieldName: 'startedAt',
                        header: 'Started At',
                        render(row) {
                            return <Time value={row.startedAt} />;
                        }
                    },
                    {
                        fieldName: 'endedAt',
                        header: 'Ended At',
                        render(row) {
                            return <Time value={row.endedAt} />;
                        }
                    }
                ]}
                rowKey='id'
                rows={groups}
            />
        </>
    );
}
