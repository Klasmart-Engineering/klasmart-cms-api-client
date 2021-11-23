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
import { getContentResourcePathById, GetContentResourcePathRequest } from "../api/content";
import { getLiveTokenByScheduleId, GetLiveTokenByScheduleIdRequest, GetLiveTokenByScheduleIdResponse, getScheduleById, GetScheduleByIdRequest, GetScheduleByIdResponse, postSchedulesTimeViewList, PostSchedulesTimeViewListRequest, PostSchedulesTimeViewListResponse } from "../api/schedule";
import { RequestConfigOptions } from "../api/shared";

interface CmsApiActions {
    getScheduleById: (request: GetScheduleByIdRequest, options?: RequestConfigOptions) => Promise<GetScheduleByIdResponse>;
    getLiveTokenByScheduleId: (request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigOptions) => Promise<GetLiveTokenByScheduleIdResponse>;
    postSchedulesTimeViewList: (request: PostSchedulesTimeViewListRequest, options?: RequestConfigOptions) => Promise<PostSchedulesTimeViewListResponse>;
    getContentResourcePathById: (request: GetContentResourcePathRequest, options?: RequestConfigOptions) => Promise<Blob>;
}

interface CmsApiClient {
    queryClient?: QueryClient,
    axiosClient?: AxiosInstance,
    updateHttpConfig?: (config: Partial<AxiosDefaults>) => void;
    actions?: CmsApiActions,
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

    const getScheduleByIdAction = useCallback((request: GetScheduleByIdRequest, options?: RequestConfigOptions) => {
        return getScheduleById(axiosClient, request, options);
    }, [ axiosClient ]);

    const getLiveTokenByScheduleIdAction = useCallback((request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigOptions) => {
        return getLiveTokenByScheduleId(axiosClient, request, options);
    }, [ axiosClient ]);

    const postSchedulesTimeViewListAction = useCallback((request: PostSchedulesTimeViewListRequest, options?: RequestConfigOptions) => {
        return postSchedulesTimeViewList(axiosClient, request, options);
    }, [ axiosClient ]);

    const getContentResourcePathByIdAction = useCallback((request: GetContentResourcePathRequest, options?: RequestConfigOptions) => {
        return getContentResourcePathById(axiosClient, request, options);
    }, [ axiosClient ]);

    const actions = useMemo(() => { 
        return {
            getScheduleById: getScheduleByIdAction,
            getLiveTokenByScheduleId: getLiveTokenByScheduleIdAction,
            postSchedulesTimeViewList: postSchedulesTimeViewListAction,
            getContentResourcePathById: getContentResourcePathByIdAction,
        };
    }, [ 
        getScheduleByIdAction, 
        getLiveTokenByScheduleIdAction, 
        postSchedulesTimeViewListAction, 
        getContentResourcePathByIdAction 
    ]);

    return (
        <CmsApiClientContext.Provider value={{
            queryClient,
            axiosClient,
            updateHttpConfig,
            actions,
        }}>
            <QueryClientProvider {...updatedProps}>
                {children}
            </QueryClientProvider>
        </CmsApiClientContext.Provider>
    );
}

export const useCmsApiClient = () => {
    const context = useContext(CmsApiClientContext);
    if (!context) {
        throw new Error(`useCmsApiClient must be used within a CmsApiClientContext.Provider`);
    }
    return context;
}
