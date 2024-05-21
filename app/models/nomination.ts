import {ProjectType} from "~/models/project";

enum Continuity {
    LEGENDS = 'Legends',
    OUT_OF_UNIVERSE = 'OutOfUniverse',
    CANON = 'Canon',
    NON_CANON = 'NonCanon',
    NON_LEGENDS = 'NonLegends'
}

const continuities = [
    { label: 'Legends', value: Continuity.LEGENDS },
    { label: 'OOU', value: Continuity.OUT_OF_UNIVERSE },
    { label: 'Canon', value: Continuity.CANON },
    { label: 'Non-Canon', value: Continuity.NON_CANON },
    { label: 'Non-Legends', value: Continuity.NON_LEGENDS },
];

enum NominationType {
    FEATURED = 'Featured',
    GOOD = 'Good',
    COMPREHENSIVE = 'Comprehensive'
}

const nominationTypes = [
    { label: 'CAN', value: NominationType.COMPREHENSIVE },
    { label: 'FAN', value: NominationType.FEATURED },
    { label: 'GAN', value: NominationType.GOOD }
];

enum Outcome {
    SUCCESSFUL = 'Successful',
    UNSUCCESSFUL = 'Unsuccessful',
    WITHDRAWN = 'Withdrawn',
    OTHER = 'Other'
}

const outcomes = [
    { label: 'Successful', value: Outcome.SUCCESSFUL },
    { label: 'Unsuccessful', value: Outcome.UNSUCCESSFUL },
    { label: 'Withdrawn', value: Outcome.WITHDRAWN },
    { label: 'Other', value: Outcome.OTHER }
];

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
    Outcome,
    outcomes,
    nominationTypes,
    continuities
};
