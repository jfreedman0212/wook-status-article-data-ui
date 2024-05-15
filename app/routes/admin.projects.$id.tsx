import {authAction, authLoader} from "~/api/auth-loader";
import {ClientActionFunction, useLoaderData} from "@remix-run/react";
import {Project, RawProject} from "~/models/project";
import {ActionFunction} from "@remix-run/node";
import {ProjectForm} from "~/components/projects";
import {DateTime} from "luxon";
import {Time} from "~/components/time";
import {PageHeader} from "~/components/layout";

export const loader = authLoader(({params}) => ({url: `projects/${params.id}`}));

export const action: ActionFunction = authAction(async ({request, params}) => {
    if (request.method.toLowerCase() === 'delete') {
        return {
            url: `projects/${params.id}`,
            method: 'delete',
            redirectUrl: '/admin/projects'
        };
    }

    return {
        url: `projects/${params.id}`,
        method: 'post',
        body: Object.fromEntries(await request.formData()),
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