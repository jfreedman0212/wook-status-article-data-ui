import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {ActionFunction, redirect} from "@remix-run/node";
import {PageHeader} from "~/components/layout";
import {NominatorForm} from "~/components/nominator-form";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const nominator = {
        name: formData.get('name'),
        attributes: formData.getAll('attributes'),
        effectiveAsOfDate: formData.get('effectiveAsOfDate'),
        effectiveAsOfTime: formData.get('effectiveAsOfTime')
    };

    const response = await wookApiFetch(request, 'nominators', {
        method: 'post',
        body: nominator
    });

    if (!response.ok) {
        return response;
    }

    return redirect('/admin/nominators');
};

export default function EditNominator() {
    return (
        <>
            <PageHeader heading='Create New Nominator' />
            <NominatorForm variant='new' />
        </>
    );
}