import {LoaderFunction} from "@remix-run/node";
import {fetchAwardGenerationGroupById} from "~/api/awards-api.server";
import {useAwardGenerationGroup} from "~/api/awards-hooks";
import {PageHeader} from "~/components/layout";
import {dateOnlyFormat, Time} from "~/components/time";
import {Table} from "~/components/table";
import {Fragment} from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
    return await fetchAwardGenerationGroupById(request, params.id!, true);
};

export default function AwardDetails() {
    const group = useAwardGenerationGroup();

    return (
        <>
            <PageHeader heading={`Awards for ${group.name}`} level='h3'>
                <small>
                    From{' '}
                    <Time value={group.startedAt} formatOptions={dateOnlyFormat} />
                    {' '}to{' '}
                    <Time value={group.endedAt} formatOptions={dateOnlyFormat} />
                </small>
            </PageHeader>
            {group.awards.map((award) => (
                <Fragment key={award.type}>
                    <PageHeader heading={AWARD_TYPES[award.type] ?? 'TODO'} level='h4' />
                    <Table
                        columns={[
                            {
                                fieldName: 'row-number',
                                header: 'Place'
                            },
                            {
                                fieldName: 'names',
                                header: 'Name(s)',
                                render({ names }) {
                                    return (
                                        <>
                                            {names.length === 1 ? <>{names[0]}</> : (
                                                <ul>
                                                    {names.map(name => <li key={name}>{name}</li>)}
                                                </ul>
                                            )}
                                        </>
                                    )
                                }
                            },
                            {
                                fieldName: 'count',
                                header: 'Count'
                            }
                        ]}
                        rowKey='count'
                        rows={award.winners}
                    />
                </Fragment>
            ))}
        </>
    );
}

// TODO: this really sucks, don't store award type as an int
const AWARD_TYPES: Record<number, string> = {
    1: 'Sheer Numbers'
};