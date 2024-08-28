import {LoaderFunction} from "@remix-run/node";
import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {json, useLoaderData} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {Nominator} from "~/models/nominator";
import {Link} from "~/components/links";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Table} from "~/components/table";

export const loader: LoaderFunction = async ({ request }) => {
    const response = await wookApiFetch(request, 'nominators');
    const data = await response.json();
    return json(data);
};

export default function Nominators() {
    const nominators = useLoaderData<Nominator[]>();
    
    return (
        <>
            <PageHeader heading='Nominators' level='h3'>
                <Link variant='secondary' to='new'>
                    <PlusCircledIcon aria-hidden='true' />
                    New
                </Link>
            </PageHeader>
            <Table
                columns={[
                    {
                        fieldName: 'name',
                        header: 'Name',
                        render(row) {
                            return (
                                <Link to={`${row.id}`}>
                                    {row.name}
                                </Link>
                            )
                        }
                    }
                ]}
                rowKey='id'
                rows={nominators}
            />
        </>
    );
}
