import {LoaderFunction} from "@remix-run/node";
import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {json, useFetcher, useLoaderData} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {Nomination} from "~/models/nomination";
import {NominationsTable} from "./nominations-table";
import {useEffect, useRef, useState} from "react";
import {FormField, Input} from "~/components/forms";
import {Button} from "~/components/buttons";
import styles from "./nominations-filter.module.css";
import {DataGridHandle} from "react-data-grid";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const response = await wookApiFetch(request, `nominations${url.searchParams.toString() ? '?' + url.searchParams.toString() : ''}`);
    const list = await response.json() as Nomination[];
    return json({
        list,
        action: url.searchParams.get('action'),
        query: url.searchParams.get('q')
    });
};

type LoaderResult = {
    list: Nomination[];
    action: 'next-page' | 'search';
    query?: string;
};

const PAYLOAD_SIZE = 500;

export default function Nominations() {
    const { list: initialNominations } = useLoaderData<LoaderResult>();
    const [nominations, setNominations] = useState(() => initialNominations);
    const tableRef = useRef<DataGridHandle | null>(null);
    
    const fetcher = useFetcher<LoaderResult>();

    function loadNextPage() {
        if (fetcher.state === 'loading') return;
        
        const lastRow = nominations[nominations.length - 1];
        const newSearchParams = new URLSearchParams({ 
            pageSize: `${PAYLOAD_SIZE}`,
            action: 'next-page'
        });
        
        if (lastRow) {
            newSearchParams.append('lastStartedAt', lastRow.startedAt);
            newSearchParams.append('lastId', `${lastRow.id}`);
        }
        
        const query = fetcher.data?.query;
        if (query) {
            newSearchParams.append('q', query);
        }
        
        fetcher.load(`/admin/nominations?${newSearchParams.toString()}`);
    }
    
    useEffect(() => {
        const data = fetcher.data;
        if (!data) return;
        
        if (data.action === 'next-page') {
            setNominations((current) => [...current, ...data.list]);   
        } else {
            tableRef?.current?.scrollToCell({ rowIdx: 0, idx: 0 });
            setNominations(data.list);
        }
    }, [fetcher.data]);

    return (
        <>
            <PageHeader heading='Nominations' level='h3' />
            <fetcher.Form method='get' className={styles.filterForm}>
                <input type="hidden" name="pageSize" value={PAYLOAD_SIZE}/>
                <input type="hidden" name="action" value="search" />
                <FormField name='q' label='Search'>
                    <Input type='search' defaultValue={fetcher.data?.query ?? ''} />
                </FormField>
                <Button type='submit' variant='secondary'>Search</Button>
            </fetcher.Form>
            <NominationsTable
                ref={tableRef}
                nominations={nominations}
                onLoad={loadNextPage}
            />
        </>
    );
}
