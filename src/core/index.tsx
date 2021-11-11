import axios,
{
    AxiosDefaults,
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
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
    interceptors?: {
        onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined;
        onRejected?: ((error: AxiosError) => AxiosError | Promise<AxiosError>) | undefined;
    }[];
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
        interceptors,
        ...rest
    } = props;

    if (!queryClient) queryClient = new QueryClient(queryOptions);
    if (!client) client = axios.create(config);
    interceptors?.forEach((interceptor) => {
        client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
    });

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
