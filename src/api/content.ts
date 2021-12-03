import { useCmsApiClient } from "../core";
import { RequestConfigMutationOptions } from "./shared";
import {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";
import {
    MutationKey,
    useMutation,
} from "react-query";

export interface GetContentResourcePathRequest {
    resource_id: string;
}

export async function getContentResourcePathById (client: AxiosInstance, request: GetContentResourcePathRequest, config?: AxiosRequestConfig) {
    const { resource_id } = request;
    const resp = await client.get<Blob>(`/v1/contents_resources/${resource_id}`, {
        responseType: `blob`,
        ...config,
    });
    return resp.data;
}

export const GET_CONTENT_RESOURCE_PATH_BY_ID_MUTATION_KEY: MutationKey = `getDownloadPath`;

export function useGetContentResourcePathById (request?: GetContentResourcePathRequest, options?: RequestConfigMutationOptions<Blob, GetContentResourcePathRequest>) {
    const { axiosClient } = useCmsApiClient();
    return useMutation([ GET_CONTENT_RESOURCE_PATH_BY_ID_MUTATION_KEY, request ], (request) => getContentResourcePathById(axiosClient, request, options?.config), options?.mutationOptions);
}
