import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {useLoaderData} from "@remix-run/react";
import {ProjectType, RawProject} from "~/models/project";
import {Link} from "~/components/links";
import {PageHeader} from "~/components/layout";
import {LoaderFunction, MetaFunction, json} from "@remix-run/node";
import {PlusCircledIcon} from "@radix-ui/react-icons";
import {Card, CardList} from "~/components/cards";

export const meta: MetaFunction = () => {
    return [
        { title: "Admin - Projects" },
        { name: "description", content: "Manage the WookieeProjects that can be assigned to articles." },
    ];
};

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
            <CardList direction='vertical'>
                {rawProjects.map(p => (
                    <Card key={p.id} name={p.name}>
                        <Link to={`${p.id}`}>
                            {p.type === ProjectType.INTELLECTUAL_PROPERTY ? <em>{p.name}</em> : <>{p.name}</>}
                        </Link>
                    </Card>
                ))}
            </CardList>
        </>
    );
}
