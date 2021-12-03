import { RequestConfigMutationOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { MutationKey } from "react-query";
export interface GetContentResourcePathRequest {
    resource_id: string;
}
export declare function getContentResourcePathById(client: AxiosInstance, request: GetContentResourcePathRequest, config?: AxiosRequestConfig): Promise<Blob>;
export declare const GET_CONTENT_RESOURCE_PATH_BY_ID_MUTATION_KEY: MutationKey;
export declare function useGetContentResourcePathById(request?: GetContentResourcePathRequest, options?: RequestConfigMutationOptions<Blob, GetContentResourcePathRequest>): import("react-query").UseMutationResult<Blob, unknown, GetContentResourcePathRequest, unknown>;
