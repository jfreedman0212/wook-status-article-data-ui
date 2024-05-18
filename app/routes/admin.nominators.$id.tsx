import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {useLoaderData} from "@remix-run/react";
import {ActionFunction, LoaderFunction, redirect, json} from "@remix-run/node";
import {PageHeader} from "~/components/layout";
import {Nominator} from "~/models/nominator";
import {NominatorForm} from "~/components/nominator-form";

export const loader: LoaderFunction = async ({ request, params }) => {
    const response = await wookApiFetch(request, `nominators/${params.id}`);
    const data = await response.json();
    return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();
    const nominator = {
        name: formData.get('name'),
        attributes: formData.getAll('attributes'),
        effectiveAsOfDate: formData.get('effectiveAsOfDate'),
        effectiveAsOfTime: formData.get('effectiveAsOfTime')
    };
    
    const response = await wookApiFetch(request, `nominators/${params.id}`, {
        method: 'post',
        body: nominator
    });

    if (!response.ok) {
        return response;
    }

    return redirect('/admin/nominators');
};

export default function EditNominator() {
    const nominator = useLoaderData<Nominator>();

    return (
        <>
            <PageHeader heading={`Edit ${nominator.name}`} />
            <NominatorForm variant='existing' defaultValues={nominator} />
        </>
    );
}