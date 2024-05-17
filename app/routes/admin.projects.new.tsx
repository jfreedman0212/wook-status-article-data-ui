import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {ActionFunction, redirect} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";
import {PageHeader} from "~/components/layout";

export const action: ActionFunction = async ({ request }) => {
    await wookApiFetch(request, 'projects', {
        method: 'post',
        body: Object.fromEntries(await request.formData()),
    });
    return redirect('/admin/projects');
};

export default function Projects() {
    return (
        <>
            <PageHeader heading='Create New Project' />
            <ProjectForm variant='new' />
        </>
    );
}