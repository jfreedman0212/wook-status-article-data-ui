import {authAction} from "~/api/auth-loader";
import {ActionFunction} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";

export const action: ActionFunction = authAction(async ({ request }) => {
    const formData = await request.formData();

    return {
        url: 'projects',
        method: 'post',
        body: {
            name: formData.get('name'),
            type: formData.get('type'),
            createdDate: formData.get('createdAtDate'),
            createdTime: formData.get('createdAtTime'),
        },
        redirectUrl: '/admin/projects'
    };
})

export default function Projects() {
    return (
        <section>
            <header>
                <h2>Create New Project</h2>
            </header>
            <ProjectForm variant='new' />
        </section>
    );
}