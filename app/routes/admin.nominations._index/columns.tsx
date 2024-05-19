import {Column} from "react-data-grid";
import {Nomination, NominationType} from "~/models/nomination";
import {Card, CardList} from "~/components/cards";
import {Link} from "~/components/links";
import {DateTime} from "luxon";
import {Time} from "~/components/time";

const nominationColumns: Column<Nomination>[] = [
    {
        key: 'nominators',
        name: 'Nominators',
        renderCell({ row }) {
            return (
                <CardList>
                    {row.nominators.map((nominator) => (
                        <Card key={nominator.id} size='small' name={nominator.name}>
                            {nominator.name}
                        </Card>
                    ))}
                </CardList>
            )
        }
    },
    {
        key: 'articleName',
        name: 'Article Name',
        renderCell({ row }) {
            return (
                <Link
                    size='small'
                    to={`https://starwars.fandom.com/wiki/${row.articleName.replace(' ', '_')}`}
                    rel="noreferrer"
                    target='_blank'
                >
                    {row.articleName}
                </Link>
            )
        }
    },
    {
        key: 'continuities',
        name: 'Continuity',
        renderCell({ row }) {
            return row.continuities.join(', ');
        }
    },
    {
        key: 'type',
        name: 'Nomination Type',
        renderCell({ row }) {
            switch (row.type) {
                case NominationType.FEATURED:
                    return 'FAN';
                case NominationType.GOOD:
                    return 'GAN';
                case NominationType.COMPREHENSIVE:
                    return 'CAN';
            }
        }
    },
    {
        key: 'outcome',
        name: 'Outcome'
    },
    {
        key: 'startedAt',
        name: 'Started At',
        renderCell({ row }) {
            const dateTime = DateTime.fromISO(row.startedAt, { zone: 'UTC' });
            return <Time value={dateTime} />;
        }
    },
    {
        key: 'endedAt',
        name: 'Ended At',
        renderCell({ row }) {
            const dateTime = row.endedAt ? DateTime.fromISO(row.endedAt, { zone: 'UTC' }) : null;
            return <Time value={dateTime} />;
        }
    },
    {
        key: 'startWordCount',
        name: 'Start Word Count'
    },
    {
        key: 'endWordCount',
        name: 'End Word Count'
    },
    {
        key: 'projects',
        name: 'Wookiee Projects',
        renderCell({ row }) {
            return (
                <CardList>
                    {row.projects.map((project) => (
                        <Card key={project.id} size='small' name={project.name}>
                            {project.name}
                        </Card>
                    ))}
                </CardList>
            )
        }
    },
];

export { nominationColumns };
