import { client } from "../core";
import {
    RequestConfigOptions,
    RequestConfigQueryOptions,
} from "./shared";
import { useMutation } from "react-query";

interface GetContentResourcePathRequest {
    resource_id: string;
}

export async function getContentResourcePathById (request: GetContentResourcePathRequest, options?: RequestConfigOptions) {
    const { resource_id } = request;
    const resp = await client.get<Blob>(`/v1/contents_resources/${resource_id}`, {
        responseType: `blob`,
        ...options?.config,
    });
    return resp.data;
}

export function useGetContentResourcePathById (request: GetContentResourcePathRequest, options?: RequestConfigQueryOptions<Blob>) {
    return useMutation([ `getDownloadPath`, request ], () => getContentResourcePathById(request, options), options?.queryOptions);
}
