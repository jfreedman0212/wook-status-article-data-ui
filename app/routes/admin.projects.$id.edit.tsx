import {useProject} from "~/api/use-project";
import {ProjectForm} from "~/components/project-form";
import {ActionFunction, LoaderFunction, redirect} from "@remix-run/node";
import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {cookieSessionStorage} from "~/auth/session.server";
import {json, useLoaderData} from "@remix-run/react";
import {Card, CardList} from "~/components/cards";

function getSuccessMessage(id: string) {
    return `admin/project/${id}/edit/successMessage`;
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const session = await cookieSessionStorage.getSession(request.headers.get('Cookie'));
    const successMessage = session.get(getSuccessMessage(params.id!));
    
    return json({ successMessage }, {
        headers: {
            'Set-Cookie': await cookieSessionStorage.commitSession(session)
        }
    });
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
    
    const session = await cookieSessionStorage.getSession(request.headers.get('Cookie'));
    session.flash(getSuccessMessage(params.id!), `Updated ${project.name}.`);

    return new Response(null, {
        status: 204,
        statusText: 'No Content',
        headers: {
            'Set-Cookie': await cookieSessionStorage.commitSession(session)
        }
    });
};

export default function EditForm() {
    const { successMessage } = useLoaderData<{ successMessage: string | null }>();
    const project = useProject();
    
    return (
        <>
            {successMessage ? (
                <CardList direction='vertical'>
                    <Card name='message' color='green'>{successMessage}</Card>
                </CardList>
            ) : null}
            <ProjectForm variant='existing' defaultValues={project} cancelTo='..' />
        </>
    );
}
