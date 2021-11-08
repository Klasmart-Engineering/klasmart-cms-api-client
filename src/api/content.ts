import { client } from "../core";
import {
    RequestConfigOptions,
    RequestConfigQueryOptions,
} from "./shared";
import { useMutation } from "react-query";

interface GetContentResourcePathRequest {
    resourceId: string;
}

export async function getContentResourcePathById (request: GetContentResourcePathRequest, options?: RequestConfigOptions) {
    const { resourceId } = request;
    const resp = await client.get<Blob>(`/v1/contents_resources/${resourceId}`, {
        responseType: `blob`,
        ...options?.config,
    });
    return resp.data;
}

export function useGetContentResourcePathById (request: GetContentResourcePathRequest, options?: RequestConfigQueryOptions<Blob>) {
    const { resourceId } = request;
    return useMutation(`getDownloadPath=${resourceId}`, () => getContentResourcePathById(request, options), options?.queryOptions);
}
