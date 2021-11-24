import { useCmsApiClient } from "../core";
import {
    RequestConfigOptions,
    RequestConfigQueryOptions,
} from "./shared";
import { AxiosInstance } from "axios";
import { useMutation } from "react-query";

export interface GetContentResourcePathRequest {
    resource_id: string;
}

export async function getContentResourcePathById (client: AxiosInstance, request: GetContentResourcePathRequest, options?: RequestConfigOptions) {
    const { resource_id } = request;
    const resp = await client.get<Blob>(`/v1/contents_resources/${resource_id}`, {
        responseType: `blob`,
        ...options?.config,
    });
    return resp.data;
}

export function useGetContentResourcePathById (request: GetContentResourcePathRequest, options?: RequestConfigQueryOptions<Blob>) {
    const { axiosClient } = useCmsApiClient();
    return useMutation([ `getDownloadPath`, request ], () => getContentResourcePathById(axiosClient, request, options), options?.queryOptions);
}
