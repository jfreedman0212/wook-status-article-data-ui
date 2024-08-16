import {RawAwardGenerationGroup} from "~/models/awards";
import {wookApiFetch} from "~/api/wook-api-fetch.server";


async function fetchAwardGenerationGroups(request: Request): Promise<RawAwardGenerationGroup[]> {
    const response = await wookApiFetch(request, `award-generation-groups`);
    return await response.json() as RawAwardGenerationGroup[];
}


export { fetchAwardGenerationGroups };