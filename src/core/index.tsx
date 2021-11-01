import axios,
{
    AxiosDefaults,
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";
import React from "react";
import {
    DefaultOptions,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
    QueryClientProviderProps,
} from "react-query";

export let client: AxiosInstance;

export let queryClient: QueryClient;

export function updateHttpConfig (config: Partial<AxiosDefaults>) {
    queryClient.cancelMutations();
    queryClient.cancelQueries();
    client.defaults = {
        ...client.defaults,
        ...config,
    };
    queryClient.clear();
}

interface ProviderProps extends Partial<QueryClientProviderProps> {
    children: React.ReactNode;
    config: AxiosRequestConfig;
    queryOptions?: {
        queryCache?: QueryCache;
        mutationCache?: MutationCache;
        defaultOptions?: DefaultOptions;
    };
}

export function CmsApiClientProvider (props: ProviderProps) {
    const {
        children,
        config,
        queryOptions,
        ...rest
    } = props;

    queryClient = new QueryClient(queryOptions);
    client = axios.create(config);
    console.log(`client.defaults.baseURL`, client.defaults.baseURL);

    const updatedProps = {
        client: queryClient,
        ...rest,
    };

    return (
        <QueryClientProvider {...updatedProps}>
            {children}
        </QueryClientProvider>
    );
}
