import { AxiosRequestConfig } from "axios";
import {
    UseMutationOptions,
    UseQueryOptions,
} from "react-query";

export type ForeignIdName = {
    id: string;
    name: string;
}

export interface RequestConfigOptions {
    config?: AxiosRequestConfig;
}

export interface RequestConfigQueryOptions<T> extends RequestConfigOptions {
    queryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
}

export interface RequestConfigMutationOptions extends RequestConfigOptions {
    mutationOptions?: Omit<UseMutationOptions, 'queryKey' | 'queryFn'>;
}
