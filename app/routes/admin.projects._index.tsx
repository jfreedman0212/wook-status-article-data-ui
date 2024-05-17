import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {useLoaderData} from "@remix-run/react";
import {ProjectType, RawProject} from "~/models/project";
import {Link} from "~/components/links";
import {PageHeader} from "~/components/layout";
import {LoaderFunction, MetaFunction, json} from "@remix-run/node";
import {PlusCircledIcon} from "@radix-ui/react-icons";

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
            <PageHeader heading='Projects'>
                <Link variant='secondary' to='new'>
                    <PlusCircledIcon aria-hidden='true' />
                    New
                </Link>
            </PageHeader>
            <ul>
                {rawProjects.map(p => (
                    <li key={p.id}>
                        <Link to={`${p.id}`}>
                            {p.type === ProjectType.INTELLECTUAL_PROPERTY ? <em>{p.name}</em> : <>{p.name}</>}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
