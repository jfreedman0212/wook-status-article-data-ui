import {DateTime} from "luxon";

type RawAwardGenerationGroup = {
    id: number;
    name: string;
    startedAt: string;
    endedAt: string;
};

type AwardGenerationGroup = {
    id: number;
    name: string;
    startedAt: DateTime;
    endedAt: DateTime;
};

export type { RawAwardGenerationGroup, AwardGenerationGroup };
