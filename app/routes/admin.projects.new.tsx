import {authAction} from "~/api/auth-loader";
import {ActionFunction} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";
import {PageHeader} from "~/components/layout";

export const action: ActionFunction = authAction(async ({ request }) => {
    return {
        url: 'projects',
        method: 'post',
        body: Object.fromEntries(await request.formData()),
        redirectUrl: '/admin/projects'
    };
})

export default function Projects() {
    return (
        <>
            <PageHeader heading='Create New Project' />
            <ProjectForm variant='new' />
        </>
    );
}