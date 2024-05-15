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
};

type Project = {
    id: number;
    name: string;
    type: ProjectType;
    createdAt: DateTime;
};

export {
    type RawProject,
    ProjectType,
    type Project
};
