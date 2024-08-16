import {LoaderFunction} from "@remix-run/node";
import {PageHeader} from "~/components/layout";
import {fetchAwardGenerationGroups} from "~/api/awards-api.server";
import {Card, CardList} from "~/components/cards";
import {Link} from "~/components/links";
import {Time} from "~/components/time";
import {useAwardGenerationGroups} from "~/api/awards-hooks";

export const loader: LoaderFunction = async ({ request }) => {
    return await fetchAwardGenerationGroups(request);
};

export default function Awards() {
    const groups = useAwardGenerationGroups();

    return (
        <>
            <PageHeader heading='Awards' level='h3'>
                <Link variant='secondary' to='new'>Generate Awards</Link>
            </PageHeader>
            <CardList direction='vertical'>
                {groups.map(group => (
                    <Card key={group.id} name={group.name} direction='vertical'>
                        <Link to={`${group.id}`}>{group.name}</Link>
                        <div>
                            <Time value={group.startedAt} /> to <Time value={group.endedAt} />
                        </div>
                    </Card>
                ))}
            </CardList>
        </>
    );
}
