import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {useLoaderData} from "@remix-run/react";
import {ProjectType, RawProject} from "~/models/project";
import {Link} from "~/components/links";
import {PageHeader} from "~/components/layout";
import {LoaderFunction, json} from "@remix-run/node";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Table} from "~/components/table";

export const loader: LoaderFunction = async ({ request }) => {
    const response = await wookApiFetch(request, 'projects');
    const data = await response.json();
    return json(data);
};

export default function Projects() {
    const rawProjects = useLoaderData<RawProject[]>();

    return (
        <>
            <PageHeader heading='Projects' level='h3'>
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
                                    {row.type === ProjectType.INTELLECTUAL_PROPERTY ? <em>{row.name}</em> : <>{row.name}</>}
                                </Link>
                            );
                        }
                    },
                    {
                        fieldName: 'type',
                        header: 'Category',
                        render(row) {
                            switch (row.type) {
                                case ProjectType.CATEGORY: return 'Category';
                                case ProjectType.INTELLECTUAL_PROPERTY: return 'Intellectual Property';
                            }
                        }
                    }
                ]}
                rowKey='id'
                rows={rawProjects}
            />
        </>
    );
}
