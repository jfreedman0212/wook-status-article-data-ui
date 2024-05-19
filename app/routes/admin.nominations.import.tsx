import {
    ActionFunction,
    LoaderFunction,
    redirect,
    unstable_createFileUploadHandler,
    unstable_parseMultipartFormData
} from "@remix-run/node";
import {authenticator} from "~/auth/authenticator.server";
import {PageHeader} from "~/components/layout";
import {Cancel, FormFields, MutationForm, PrimaryButtons, Submit} from "~/components/forms/mutation";
import {FormField, Input} from "~/components/forms";
import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {Details, Summary} from "~/components/details";
import {Datalist} from "~/components/datalist";

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, { failureRedirect: "/", });
    return null;
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await unstable_parseMultipartFormData(
        request,
        unstable_createFileUploadHandler({ file: args => args.filename })
    );

    const response = await wookApiFetch(request, 'nominations/upload', {
        method: 'post',
        body: formData.get('upload'),
        headers: {
            'Content-Type': 'text/csv'
        }
    });

    if (!response.ok) {
        return response;
    }

    return redirect('/admin/nominations');
};

export default function ImportForm() {
    return (
        <>
            <PageHeader heading='Import Nominations' level='h3'/>
            <Details>
                <Summary>What columns need to be in the CSV?</Summary>
                <ImportColumns />
            </Details>
            <MutationForm encType="multipart/form-data">
                <FormFields>
                    <FormField
                        name='upload'
                        label='CSV File'
                        hint={[
                            "Any projects and nominators that don't already exist will be created for you.",
                            "This will not update existing nominations, only create new ones."
                        ]}
                        required
                    >
                        <Input type='file' accept='text/csv'/>
                    </FormField>
                </FormFields>
                <PrimaryButtons>
                    <Submit/>
                    <Cancel to='/admin/nominations'/>
                </PrimaryButtons>
            </MutationForm>
        </>
    );
}

function ImportColumns() {
    return (
        <Datalist>
            <dt>Nominator</dt>
            <dd>Semicolon-separated list of Nominator names.</dd>

            <dt>Article</dt>
            <dd>Name of the article being nominated.</dd>

            <dt>Continuity</dt>
            <dd>
                (Optional) Comma-separated list of the Continuities for the article.
                Acceptable values are: Legends, OOU, Canon, Non-Canon, and Non-Legends.
            </dd>

            <dt>Nomination Type</dt>
            <dd>
                What this nomination is for. Acceptable values are: FAN (featured), CAN (comprehensive), or GAN (good).
            </dd>

            <dt>Outcome</dt>
            <dd>Accepted values: successful, unsuccessful, withdrawn, and other.</dd>

            <dt>Start Time</dt>
            <dd>(Optional) Time in UTC when this nomination starts. Expected in 24-hour format (e.g. 03:33, 23:59, etc.).</dd>

            <dt>Start Date</dt>
            <dd>Date in UTC when this nomination starts. Expected in the format YYYY-MM-DD (e.g. 2024-01-01).</dd>

            <dt>End Time</dt>
            <dd>(Optional) Time in UTC when this nomination ends. Expected in 24-hour format (e.g. 03:33, 23:59, etc.).</dd>

            <dt>End Date</dt>
            <dd>(Optional) Date in UTC when this nomination ends. Expected in the format YYYY-MM-DD (e.g. 2024-01-01).</dd>

            <dt>Start Word Count</dt>
            <dd>(Optional) Number of words at the beginning of the nomination period.</dd>

            <dt>End Word Count</dt>
            <dd>(Optional) Number of words at the end of the nomination period.</dd>

            <dt>Wookiee Projects</dt>
            <dd>(Optional) Semicolon-separated list of WookieeProjects that this article is a part of.</dd>
        </Datalist>
    );
}
