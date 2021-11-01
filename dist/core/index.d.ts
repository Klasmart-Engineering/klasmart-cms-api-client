import { AxiosDefaults, AxiosInstance, AxiosRequestConfig } from "axios";
import React from "react";
import { DefaultOptions, MutationCache, QueryCache, QueryClient, QueryClientProviderProps } from "react-query";
export declare let client: AxiosInstance;
export declare let queryClient: QueryClient;
export declare function updateHttpConfig(config: Partial<AxiosDefaults>): void;
interface ProviderProps extends Partial<QueryClientProviderProps> {
    children: React.ReactNode;
    config: AxiosRequestConfig;
    queryOptions?: {
        queryCache?: QueryCache;
        mutationCache?: MutationCache;
        defaultOptions?: DefaultOptions;
    };
}
export declare function CmsApiClientProvider(props: ProviderProps): JSX.Element;
export {};
