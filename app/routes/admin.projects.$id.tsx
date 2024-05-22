import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {Outlet} from "@remix-run/react";
import {LoaderFunction, json} from "@remix-run/node";
import {Time} from "~/components/time";
import {PageHeader} from "~/components/layout";
import {NavLink} from "~/components/links";
import {useProject} from "~/api/use-project";

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await wookApiFetch(request, `projects/${params.id}`);
    const data = await response.json();
    return json(data);
};

export default function Projects() {
    const project = useProject();

    return (
        <>
            <PageHeader heading={project.name}>
                <small>
                    Created At <Time value={project.createdAt} />
                </small>
                <NavLink to='nominations'>Nominations</NavLink>
                <NavLink to='history'>History</NavLink>
                <NavLink to='edit'>Edit</NavLink>
            </PageHeader>
            <Outlet />
        </>
    );
}