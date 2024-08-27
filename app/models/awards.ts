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

type Award = {
    type: number;
    winners: Winner[];
};

type Winner = {
    names: string[];
    count: number;
};

type RawAwardGenerationGroupDetail = RawAwardGenerationGroup & {
    awards: Award[];
};

type AwardGenerationGroupDetail = AwardGenerationGroup & {
    awards: Award[];
};

export type {
    RawAwardGenerationGroup,
    AwardGenerationGroup,
    RawAwardGenerationGroupDetail,
    AwardGenerationGroupDetail
};
