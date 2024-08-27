import {
    AwardGenerationGroup,
    AwardGenerationGroupDetail,
    RawAwardGenerationGroup,
    RawAwardGenerationGroupDetail
} from "~/models/awards";
import {useLoaderData} from "@remix-run/react";
import {DateTime} from "luxon";

function convert(raw: RawAwardGenerationGroup): AwardGenerationGroup {
    return {
        ...raw,
        startedAt: DateTime.fromISO(raw.startedAt, {zone: 'UTC'}),
        endedAt: DateTime.fromISO(raw.endedAt, {zone: 'UTC'})
    };
}

function convertDetail(raw: RawAwardGenerationGroupDetail): AwardGenerationGroupDetail {
    return {
        ...raw,
        startedAt: DateTime.fromISO(raw.startedAt, {zone: 'UTC'}),
        endedAt: DateTime.fromISO(raw.endedAt, {zone: 'UTC'})
    };
}

function useAwardGenerationGroups(): AwardGenerationGroup[] {
    const rawGenerationGroups = useLoaderData<RawAwardGenerationGroup[]>();

    return rawGenerationGroups.map<AwardGenerationGroup>(convert);
}

function useAwardGenerationGroup(): AwardGenerationGroupDetail {
    const rawGenerationGroup = useLoaderData<RawAwardGenerationGroupDetail>();
    return convertDetail(rawGenerationGroup);
}

export { useAwardGenerationGroup, useAwardGenerationGroups };
