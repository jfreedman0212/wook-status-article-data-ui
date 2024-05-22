import {useRouteLoaderData} from "@remix-run/react";
import {Project, RawProject} from "~/models/project";
import {DateTime} from "luxon";

function useProject(): Project {
    const { createdAt, ...rawProject } = useRouteLoaderData<RawProject>("routes/admin.projects.$id")!;
    const parsedCreatedAt = DateTime.fromISO(createdAt, {zone: 'UTC'});
    return {
        ...rawProject,
        createdAt: parsedCreatedAt
    };
}

export { useProject };
