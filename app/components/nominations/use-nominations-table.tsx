import {useFetcher, useLoaderData} from "@remix-run/react";
import {useEffect, useRef, useState} from "react";
import {DataGridHandle} from "react-data-grid";
import styles from "./nominations-filter.module.css";
import {FormField, Input, Select} from "~/components/forms";
import {continuities, Nomination, nominationTypes, outcomes} from "~/models/nomination";
import {Button} from "~/components/buttons";

type LoaderResult = {
    page: Nomination[];
    action: 'next-page' | 'search';
    totalItems: number;
};

function useNominationsTable(payloadSize: number = 100) {
    const { page: initialNominations, totalItems: initialTotalItems } = useLoaderData<LoaderResult>();
    const [nominations, setNominations] = useState(() => initialNominations);
    const [totalItems, setTotalItems] = useState(initialTotalItems);

    useEffect(() => {
        setNominations(initialNominations);
        setTotalItems(initialTotalItems);
        tableRef?.current?.scrollToCell({ rowIdx: 0 });
    }, [initialNominations, initialTotalItems]);
    
    const [hasReachedEnd, setHasReachedEnd] = useState(() => initialNominations.length < payloadSize);
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
        const totalItems = fetcher.data?.totalItems;

        if (!newNominations) return;

        if (action === 'next-page') {
            setNominations((current) => [...current, ...newNominations]);
        } else {
            tableRef?.current?.scrollToCell({ rowIdx: 0 });
            setNominations(newNominations);
        }
        setHasReachedEnd(newNominations.length < payloadSize);
        setTotalItems(totalItems!);
    }, [fetcher.data, payloadSize]);
    
    const Form = (
        <fetcher.Form method='get' className={styles.filterForm} ref={formRef}>
            <input type="hidden" name="pageSize" value={payloadSize} />
            <FormField name='order' label='Sort Direction' required>
                <Select defaultValue='desc'>
                    <option value='desc'>Reverse Chronological</option>
                    <option value='asc'>Chronological</option>
                </Select>
            </FormField>
            <FormField name='continuity' label='Continuity'>
                <Select>
                    <option value=''>--</option>
                    {continuities.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </Select>
            </FormField>
            <FormField name='type' label='Nomination Type'>
                <Select>
                    <option value=''>--</option>
                    {nominationTypes.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </Select>
            </FormField>
            <FormField name='outcome' label='Outcome'>
                <Select>
                    <option value=''>--</option>
                    {outcomes.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </Select>
            </FormField>
            <FormField name='startedAt' label='Started At'>
                <Input type='date'/>
            </FormField>
            <FormField name='endedAt' label='Ended At'>
                <Input type='date'/>
            </FormField>
            <Button type='submit' variant='secondary' name='action' value='search'>Apply Filters</Button>
            <Button type='reset' variant='link'>Reset</Button>
        </fetcher.Form>
    );

    return {
        tableRef,
        totalItems,
        Form,
        loadNextPage,
        nominations
    };
}

export {useNominationsTable};
