import { AxiosRequestConfig } from "axios";
import { UseMutationOptions, UseQueryOptions } from "react-query";
export declare type ForeignIdName = {
    id: string;
    name: string;
};
interface RequestBaseOptions {
    config?: AxiosRequestConfig;
}
export interface RequestQueryOptions extends RequestBaseOptions {
    queryOptions?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>;
}
export interface RequestMutationOptions extends RequestBaseOptions {
    mutationOptions?: Omit<UseMutationOptions, 'queryKey' | 'queryFn'>;
}
export {};
