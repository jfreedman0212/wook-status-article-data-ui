import {authAction, authLoader} from "~/api/auth-loader";
import {ClientActionFunction, useLoaderData} from "@remix-run/react";
import {Project, RawProject} from "~/models/project";
import {ActionFunction} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";
import {DateTime} from "luxon";
import {Time} from "~/components/time";

export const loader = authLoader(({params}) => ({url: `projects/${params.id}`}));

export const action: ActionFunction = authAction(async ({request, params}) => {
    const formData = await request.formData();
    const action = formData.get('action') as 'save' | 'delete';

    if (action === 'delete') {
        return {
            url: `projects/${params.id}`,
            method: 'delete',
            redirectUrl: '/admin/projects'
        };
    }

    return {
        url: `projects/${params.id}`,
        method: 'post',
        body: {
            name: formData.get('name'),
            type: formData.get('type')
        },
        redirectUrl: '/admin/projects'
    };
});

export const clientAction: ClientActionFunction = async ({request, serverAction}) => {
    if (request.method.toLowerCase() === 'delete' && !confirm('Are you sure you want to delete this project?')) {
        return null;
    }

    return await serverAction();
};

export default function Projects() {
    const {createdAt, ...rawProject} = useLoaderData<RawProject>();
    const parsedCreatedAt = DateTime.fromISO(createdAt, {zone: 'UTC'});
    const project: Project = {
        ...rawProject,
        createdAt: parsedCreatedAt
    };

    return (
        <section>
            <header>
                <h2>Edit {project.name}</h2>
                <small>
                    Created At <Time value={project.createdAt}/>
                </small>
            </header>
            <ProjectForm variant='existing' defaultValues={project}/>
        </section>
    );
}