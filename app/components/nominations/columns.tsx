import {continuities, Nomination, nominationTypes, outcomes} from "~/models/nomination";
import {Card, CardList} from "~/components/cards";
import {Link} from "~/components/links";
import {DateTime} from "luxon";
import {Time} from "~/components/time";
import {ProjectType} from "~/models/project";
import {ColumnDefinition} from "~/components/table";

const nominationColumns: ColumnDefinition<Nomination>[] = [
    {
        fieldName: 'nominators',
        header: 'Nominators',
        render(row) {
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
        fieldName: 'articleName',
        header: 'Article Name',
        render(row) {
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
        fieldName: 'continuities',
        header: 'Continuity',
        render(row) {
            return row.continuities
                .map(c => continuities.find(it => it.value === c)?.label)
                .sort()
                .join(', ');
        }
    },
    {
        fieldName: 'type',
        header: 'Nomination Type',
        render(row) {
            return nominationTypes.find(it => it.value === row.type)?.label;
        }
    },
    {
        fieldName: 'outcome',
        header: 'Outcome',
        render(row) {
            return outcomes.find(it => it.value === row.outcome)?.label;
        }
    },
    {
        fieldName: 'startedAt',
        header: 'Started At',
        render(row) {
            const dateTime = DateTime.fromISO(row.startedAt, {zone: 'UTC'});
            return <Time value={dateTime}/>;
        }
    },
    {
        fieldName: 'endedAt',
        header: 'Ended At',
        render(row) {
            const dateTime = row.endedAt ? DateTime.fromISO(row.endedAt, {zone: 'UTC'}) : null;
            return <Time value={dateTime}/>;
        }
    },
    {
        fieldName: 'startWordCount',
        header: 'Start Word Count'
    },
    {
        fieldName: 'endWordCount',
        header: 'End Word Count'
    },
    {
        fieldName: 'projects',
        header: 'Wookiee Projects',
        render(row) {
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
