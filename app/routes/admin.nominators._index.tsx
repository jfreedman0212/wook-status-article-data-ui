import {LoaderFunction} from "@remix-run/node";
import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {json, useLoaderData} from "@remix-run/react";
import {PageHeader} from "~/components/layout";
import {Card, CardList} from "~/components/cards";
import {Nominator} from "~/models/nominator";
import {Link} from "~/components/links";
import {PlusCircledIcon} from "@radix-ui/react-icons";

export const loader: LoaderFunction = async ({ request }) => {
    const response = await wookApiFetch(request, 'nominators');
    const data = await response.json();
    return json(data);
};

export default function Nominators() {
    const nominators = useLoaderData<Nominator[]>();
    
    return (
        <>
            <PageHeader heading='Nominators' level='h3'>
                <Link variant='secondary' to='new'>
                    <PlusCircledIcon aria-hidden='true' />
                    New
                </Link>
            </PageHeader>
            <CardList direction='vertical'>
                {nominators.map(nominator => (
                    <Card key={nominator.id} name={nominator.name}>
                        <Link to={`${nominator.id}`}>
                            {nominator.name}
                        </Link>
                    </Card>
                ))}
            </CardList>
        </>
    );
}
