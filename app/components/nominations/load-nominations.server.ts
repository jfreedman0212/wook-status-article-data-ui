import {wookApiFetch} from "~/api/wook-api-fetch.server";
import {Nomination} from "~/models/nomination";

type NominationList = {
    page: Nomination[];
    totalItems: number;
};

async function loadNominations(request: Request, urlSearchParams: URLSearchParams): Promise<NominationList> {
    const response = await wookApiFetch(
        request, 
        `nominations${urlSearchParams.toString() ? '?' + urlSearchParams.toString() : ''}`
    );
    return await response.json() as NominationList;
}

export { loadNominations, type NominationList };
