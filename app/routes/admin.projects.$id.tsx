import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {ClientActionFunction, useLoaderData} from "@remix-run/react";
import {Project, RawProject} from "~/models/project";
import {ActionFunction, LoaderFunction, redirect, json} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";
import {DateTime} from "luxon";
import {Time} from "~/components/time";
import {PageHeader} from "~/components/layout";

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await wookApiFetch(request, `projects/${params.id}`);
    const data = await response.json();
    return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
    if (request.method.toLowerCase() === 'delete') {
        await wookApiFetch(request, `projects/${params.id}`, { method: 'delete' });
        return redirect('/admin/projects');
    }

    await wookApiFetch(request, `projects/${params.id}`, { 
        method: 'post',
        body: Object.fromEntries(await request.formData()),
    });
    return redirect('/admin/projects');
};

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
        <>
            <PageHeader heading={`Edit ${project.name}`}>
                <small>
                    Created At <Time value={project.createdAt}/>
                </small>
            </PageHeader>
            <ProjectForm variant='existing' defaultValues={project}/>
        </>
    );
}