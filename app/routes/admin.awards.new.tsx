import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {ActionFunction, redirect} from "@remix-run/node";
import {PageHeader} from "~/components/layout";
import {Cancel, FormFields, MutationForm, PrimaryButtons, Submit} from "~/components/forms/mutation";
import {FormField, Input} from "~/components/forms";

export const action: ActionFunction = async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());

    const response = await wookApiFetch(request, 'award-generation-groups', {
        method: 'post',
        body: formData
    });

    if (!response.ok) {
        return response;
    }

    const newId = await response.json() as number;

    return redirect(`/admin/awards/${newId}`);
};

export default function GenerateAwards() {
    return (
        <>
            <PageHeader heading='Generate Awards' />
            <MutationForm>
                <FormFields>
                    <FormField name='name' label='Name' required>
                        <Input type='text' />
                    </FormField>
                    <FormField name='startedAt' label='Started At' required>
                        <Input type='date' />
                    </FormField>
                    <FormField name='endedAt' label='Ended At' required>
                        <Input type='date' />
                    </FormField>
                </FormFields>
                <PrimaryButtons>
                    <Submit />
                    <Cancel to='/admin/awards' />
                </PrimaryButtons>
            </MutationForm>
        </>
    );
}