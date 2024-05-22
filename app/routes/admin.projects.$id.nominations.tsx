import {LoaderFunction} from "@remix-run/node";
import {NominationsTable, useNominationsTable} from "~/components/nominations";
import {json} from "@remix-run/react";
import {loadNominations} from "~/components/nominations/load-nominations.server";
import {PageHeader} from "~/components/layout";

export const loader: LoaderFunction = async ({ request, params }) => {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    url.searchParams.delete('action');
    url.searchParams.set('projectId', params.id!);

    const { page, totalItems } = await loadNominations(request, url.searchParams);
    return json({ page, totalItems, action });
};

export default function ProjectNominations() {
    const {
        tableRef,
        totalItems,
        Form,
        loadNextPage,
        nominations
    } = useNominationsTable();

    return (
        <>
            <PageHeader heading='Nominations' level='h3'>
                <small>Showing {nominations.length} of {totalItems}</small>
            </PageHeader>
            {Form}
            <NominationsTable ref={tableRef} nominations={nominations} onLoad={loadNextPage} />
        </>
    );
}