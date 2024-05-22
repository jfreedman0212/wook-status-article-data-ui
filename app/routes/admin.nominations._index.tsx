import {LoaderFunction} from "@remix-run/node";
import {json} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {NominationsTable, useNominationsTable} from "~/components/nominations";
import {loadNominations} from "~/components/nominations/load-nominations.server";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    url.searchParams.delete('action');
    
    const { page, totalItems } = await loadNominations(request, url.searchParams);
    return json({ page, totalItems, action });
};

export default function Nominations() {
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
