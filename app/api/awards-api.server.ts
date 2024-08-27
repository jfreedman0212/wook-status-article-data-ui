import {RawAwardGenerationGroup} from "~/models/awards";
import {wookApiFetch} from "~/api/wook-api-fetch.server";

async function fetchAwardGenerationGroups(request: Request, skipAuthentication: boolean = false): Promise<RawAwardGenerationGroup[]> {
    const response = await wookApiFetch(request, `award-generation-groups`, { skipAuthentication });
    return await response.json() as RawAwardGenerationGroup[];
}

async function fetchAwardGenerationGroupById(request: Request, id: string, skipAuthentication: boolean = false): Promise<RawAwardGenerationGroup> {
    const response = await wookApiFetch(request, `award-generation-groups/${id}`, { skipAuthentication });
    return await response.json() as RawAwardGenerationGroup;
}

export { fetchAwardGenerationGroups, fetchAwardGenerationGroupById };
