import {DateTime} from "luxon";

enum ProjectType {
    CATEGORY = 'Category',
    INTELLECTUAL_PROPERTY = 'IntellectualProperty',
}

type RawProject = {
    id: number;
    name: string;
    type: ProjectType;
    createdAt: string;
    isArchived: boolean;
};

type Project = {
    id: number;
    name: string;
    type: ProjectType;
    createdAt: DateTime;
    isArchived: boolean;
};

export {
    type RawProject,
    ProjectType,
    type Project
};
