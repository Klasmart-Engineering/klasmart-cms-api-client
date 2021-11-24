import { RequestConfigOptions, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance } from "axios";
export interface GetContentResourcePathRequest {
    resource_id: string;
}
export declare function getContentResourcePathById(client: AxiosInstance, request: GetContentResourcePathRequest, options?: RequestConfigOptions): Promise<Blob>;
export declare function useGetContentResourcePathById(request: GetContentResourcePathRequest, options?: RequestConfigQueryOptions<Blob>): import("react-query").UseMutationResult<Blob, unknown, void, unknown>;
