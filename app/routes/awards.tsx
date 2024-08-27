import {NestedNavLayout, PageHeader} from "~/components/layout";
import {LoaderFunction} from "@remix-run/node";
import {useAwardGenerationGroups} from "~/api/awards-hooks";
import {fetchAwardGenerationGroups} from "~/api/awards-api.server";

export const loader: LoaderFunction = async ({ request }) => {
    return await fetchAwardGenerationGroups(request, true);
};

export default function Awards() {
    const groups = useAwardGenerationGroups();

    if (groups.length === 0) {
        return (
            <>
                <PageHeader heading='Status Article Nomination Awards' />
                <span>No awards have been generated yet. Check back soon!</span>
            </>
        );
    }

    const navItems = groups.map((group) => ({ to: `/awards/${group.id}`, label: group.name }));

    return (
        <NestedNavLayout heading='Status Article Nomination Awards' navItems={navItems} />
    );
}
