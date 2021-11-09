import { RequestConfigOptions, RequestConfigQueryOptions } from "./shared";
interface GetContentResourcePathRequest {
    resource_id: string;
}
export declare function getContentResourcePathById(request: GetContentResourcePathRequest, options?: RequestConfigOptions): Promise<Blob>;
export declare function useGetContentResourcePathById(request: GetContentResourcePathRequest, options?: RequestConfigQueryOptions<Blob>): import("react-query").UseMutationResult<Blob, unknown, void, unknown>;
export {};
