import {LoaderFunction} from "@remix-run/node";
import {fetchAwardGenerationGroupById} from "~/api/awards-api.server";
import {useAwardGenerationGroup} from "~/api/awards-hooks";
import {PageHeader} from "~/components/layout";
import {dateOnlyFormat, Time} from "~/components/time";

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
                <section key={award.type}>
                    <PageHeader heading={AWARD_TYPES[award.type] ?? 'TODO'} level='h4' />
                    <table>
                        <thead>
                        <tr>
                            <th>Place</th>
                            <th>Name(s)</th>
                            <th>Count</th>
                        </tr>
                        </thead>
                        <tbody>
                        {award.winners.map((winner, index) => (
                            <tr key={winner.count}>
                                <td>{index + 1}</td>
                                <td>
                                    {winner.names.length === 1 ? <>{winner.names[0]}</> : (
                                        <ul>
                                            {winner.names.map(name => <li key={name}>{name}</li>)}
                                        </ul>
                                    )}
                                </td>
                                <td>{winner.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
            ))}
        </>
    );
}

// TODO: this really sucks, don't store award type as an int
const AWARD_TYPES: Record<number, string> = {
    1: 'Sheer Numbers'
};