import {ProjectType} from "~/models/project";

enum Continuity {
    LEGENDS = 'Legends',
    OUT_OF_UNIVERSE = 'OutOfUniverse',
    CANON = 'Canon',
    NON_CANON = 'NonCanon',
    NON_LEGENDS = 'NonLegends'
}

enum NominationType {
    FEATURED = 'Featured',
    GOOD = 'Good',
    COMPREHENSIVE = 'Comprehensive'
}

enum Outcome {
    SUCCESSFUL = 'Successful',
    UNSUCCESSFUL = 'Unsuccessful',
    WITHDRAWN = 'Withdrawn',
    OTHER = 'Other'
}

type NominationProject = {
    id: number;
    name: string;
    type: ProjectType;
    isArchived: boolean;
};

type NominationNominator = {
    id: number;
    name: string;
};

type Nomination = {
    id: number;
    articleName: string;
    continuities: Continuity[];
    type: NominationType;
    outcome: Outcome;
    startedAt: string;
    endedAt?: string;
    startWordCount?: number;
    endWordCount?: number;
    nominators: NominationNominator[];
    projects: NominationProject[];
};

export {
    type Nomination,
    type NominationProject,
    type NominationNominator,
    Continuity,
    NominationType,
    Outcome
};
