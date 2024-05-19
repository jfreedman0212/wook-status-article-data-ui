import {Column} from "react-data-grid";
import {Continuity, Nomination, NominationType} from "~/models/nomination";
import {Card, CardList} from "~/components/cards";
import {Link} from "~/components/links";
import {DateTime} from "luxon";
import {Time} from "~/components/time";
import {ProjectType} from "~/models/project";

const nominationColumns: Column<Nomination>[] = [
    {
        key: 'nominators',
        name: 'Nominators',
        renderCell({row}) {
            return (
                <CardList>
                    {row.nominators.map((nominator) => (
                        <Card key={nominator.id} size='small' name={nominator.name}>
                            <Link size='small' to={`/admin/nominators/${nominator.id}`}>{nominator.name}</Link>
                        </Card>
                    ))}
                </CardList>
            )
        }
    },
    {
        key: 'articleName',
        name: 'Article Name',
        renderCell({row}) {
            const baseArticleName = row.articleName.replace(/ \([a-zA-Z]+ nomination\)/i, '');

            return (
                <Link
                    size='small'
                    to={`https://starwars.fandom.com/wiki/${baseArticleName.replace(' ', '_')}`}
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
        renderCell({row}) {
            return row.continuities
                .map(c => {
                    switch (c) {
                        case Continuity.LEGENDS:
                            return 'Legends';
                        case Continuity.OUT_OF_UNIVERSE:
                            return 'OOU';
                        case Continuity.CANON:
                            return 'Canon';
                        case Continuity.NON_CANON:
                            return 'Non-Canon';
                        case Continuity.NON_LEGENDS:
                            return 'Non-Legends';
                    }
                })
                .sort()
                .join(', ');
        }
    },
    {
        key: 'type',
        name: 'Nomination Type',
        renderCell({row}) {
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
        renderCell({row}) {
            const dateTime = DateTime.fromISO(row.startedAt, {zone: 'UTC'});
            return <Time value={dateTime}/>;
        }
    },
    {
        key: 'endedAt',
        name: 'Ended At',
        renderCell({row}) {
            const dateTime = row.endedAt ? DateTime.fromISO(row.endedAt, {zone: 'UTC'}) : null;
            return <Time value={dateTime}/>;
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
        renderCell({row}) {
            return (
                <CardList>
                    {row.projects.map((project) => {
                        const projectName = project.type === ProjectType.INTELLECTUAL_PROPERTY
                            ? <em>{project.name}</em>
                            : project.name;

                        return (
                            <Card key={project.id} size='small' name={project.name}>
                                {project.isArchived ? (
                                    <s>{projectName}</s>
                                ) : (
                                    <Link size='small' to={`/admin/projects/${project.id}`}>{projectName}</Link>
                                )}
                            </Card>
                        );
                    })}
                </CardList>
            )
        }
    },
];

export {nominationColumns};
