import {AwardGenerationGroup, RawAwardGenerationGroup} from "~/models/awards";
import {useLoaderData} from "@remix-run/react";
import {DateTime} from "luxon";

function useAwardGenerationGroups(): AwardGenerationGroup[] {
    const rawGenerationGroups = useLoaderData<RawAwardGenerationGroup[]>();

    return rawGenerationGroups.map<AwardGenerationGroup>(it => ({
        ...it,
        startedAt: DateTime.fromISO(it.startedAt, {zone: 'UTC'}),
        endedAt: DateTime.fromISO(it.endedAt, {zone: 'UTC'})
    }));
}

export { useAwardGenerationGroups };
