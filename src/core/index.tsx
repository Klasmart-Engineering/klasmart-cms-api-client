import axios,
{
    AxiosDefaults,
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import React, { createContext, useCallback, useContext, useMemo } from "react";
import {
    DefaultOptions,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
    QueryClientProviderProps,
} from "react-query";

interface CmsApiClient {
    queryClient?: QueryClient,
    axiosClient?: AxiosInstance,
    updateHttpConfig?: (config: Partial<AxiosDefaults>) => void;
}
interface ProviderProps extends Partial<QueryClientProviderProps> {
    children: React.ReactNode;
    config: AxiosRequestConfig;
    interceptors?: {
        onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined;
        onRejected?: ((error: AxiosError) => any) | undefined;
    }[];
    queryOptions?: {
        queryCache?: QueryCache;
        mutationCache?: MutationCache;
        defaultOptions?: DefaultOptions;
    };
}

const CmsApiClientContext = createContext<CmsApiClient>({});

export function CmsApiClientProvider (props: ProviderProps) {
    const {
        children,
        config,
        queryOptions,
        interceptors,
        ...rest
    } = props;

    const queryClient = useMemo(() => new QueryClient(queryOptions), [ queryOptions ]);
    const axiosClient = useMemo(() => {
        const client = axios.create(config);

        for (const interceptor of interceptors ?? []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        return client;
    }, [ config, interceptors ]);
    
    const updateHttpConfig = useCallback((config: Partial<AxiosDefaults>) => {
        queryClient.cancelMutations();
        queryClient.cancelQueries();
        axiosClient.defaults = {
            ...axiosClient.defaults,
            ...config,
        };
        queryClient.clear();
    }, [ axiosClient, queryClient ]);

    const updatedProps = {
        client: queryClient,
        ...rest,
    };

    return (
        <CmsApiClientContext.Provider value={{
            queryClient,
            axiosClient,
            updateHttpConfig
        }}>
            <QueryClientProvider {...updatedProps}>
                {children}
            </QueryClientProvider>
        </CmsApiClientContext.Provider>
    );
}

export const useCmsApiClient = () => useContext(CmsApiClientContext);
