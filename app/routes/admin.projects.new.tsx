import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {ActionFunction, redirect} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";
import {PageHeader} from "~/components/layout";

export const action: ActionFunction = async ({ request }) => {
    const response = await wookApiFetch(request, 'projects', {
        method: 'post',
        body: Object.fromEntries(await request.formData()),
    });

    if (!response.ok) {
        return response;
    }
    
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