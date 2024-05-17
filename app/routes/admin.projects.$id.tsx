import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {useLoaderData} from "@remix-run/react";
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
    const { action, ...project } = Object.fromEntries(await request.formData());
    
    if (action === 'delete') {
        await wookApiFetch(request, `projects/${params.id}`, { method: 'delete' });
        return redirect('/admin/projects');
    }

    const response = await wookApiFetch(request, `projects/${params.id}`, {
        method: 'post',
        body: project
    });
    
    if (!response.ok) {
        return response;
    }
    
    return redirect('/admin/projects');
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