import {LoaderFunction} from "@remix-run/node";
import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {json, useFetcher, useLoaderData} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {continuities, Nomination, nominationTypes, outcomes} from "~/models/nomination";
import {NominationsTable} from "./nominations-table";
import {useEffect, useRef, useState} from "react";
import {FormField, Input, Select} from "~/components/forms";
import {Button} from "~/components/buttons";
import styles from "./nominations-filter.module.css";
import {DataGridHandle} from "react-data-grid";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    url.searchParams.delete('action');

    const response = await wookApiFetch(request, `nominations${url.searchParams.toString() ? '?' + url.searchParams.toString() : ''}`);
    const { page, totalItems } = await response.json() as { page: Nomination[], totalItems: number };
    return json({ page, totalItems, action });
};

type LoaderResult = {
    page: Nomination[];
    action: 'next-page' | 'search';
    totalItems: number;
};

const PAYLOAD_SIZE = 100;

export default function Nominations() {
    const { page: initialNominations, totalItems } = useLoaderData<LoaderResult>();
    
    const [nominations, setNominations] = useState(() => initialNominations);
    const [hasReachedEnd, setHasReachedEnd] = useState(() => initialNominations.length < PAYLOAD_SIZE);
    const tableRef = useRef<DataGridHandle | null>(null);
    
    const fetcher = useFetcher<LoaderResult>();
    const formRef = useRef<HTMLFormElement | null>(null);

    function loadNextPage() {
        if (hasReachedEnd || fetcher.state === 'loading') return;
        
        const formData = new FormData(formRef.current!);
        formData.set('action', 'next-page');

        const lastRow = nominations[nominations.length - 1];
        if (lastRow) {
            formData.set('lastStartedAt', lastRow.startedAt);
            formData.set('lastId', `${lastRow.id}`);
        }
        
        fetcher.submit(formData);
    }
    
    useEffect(() => {
        const newNominations = fetcher.data?.page;
        const action = fetcher.data?.action;

        if (!newNominations) return;
        
        if (action === 'next-page') {
            setNominations((current) => [...current, ...newNominations]);
        } else {
            tableRef?.current?.scrollToCell({ rowIdx: 0, idx: 0 });
            setNominations(newNominations);
        }
        setHasReachedEnd(newNominations.length < PAYLOAD_SIZE);
    }, [fetcher.data]);

    return (
        <>
            <PageHeader heading='Nominations' level='h3'>
                <small>Showing {nominations.length} of {fetcher.data?.totalItems ?? totalItems}</small>
            </PageHeader>
            <fetcher.Form method='get' className={styles.filterForm} ref={formRef}>
                <input type="hidden" name="pageSize" value={PAYLOAD_SIZE}/>
                <FormField name='order' label='Sort Direction' required>
                    <Select defaultValue='desc'>
                        <option value='desc'>Reverse Chronological</option>
                        <option value='asc'>Chronological</option>
                    </Select>
                </FormField>
                <FormField name='continuity' label='Continuity'>
                    <Select>
                        <option value=''>--</option>
                        {continuities.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </Select>
                </FormField>
                <FormField name='type' label='Nomination Type'>
                    <Select>
                        <option value=''>--</option>
                        {nominationTypes.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </Select>
                </FormField>
                <FormField name='outcome' label='Outcome'>
                    <Select>
                        <option value=''>--</option>
                        {outcomes.map(({ label, value }) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </Select>
                </FormField>
                <FormField name='startedAt' label='Started At'>
                    <Input type='date' />
                </FormField>
                <FormField name='endedAt' label='Ended At'>
                    <Input type='date' />
                </FormField>
                <Button type='submit' variant='secondary' name='action' value='search'>Apply Filters</Button>
                <Button type='reset' variant='link'>Reset</Button>
            </fetcher.Form>
            <NominationsTable
                ref={tableRef}
                nominations={nominations}
                onLoad={loadNextPage}
            />
        </>
    );
}
