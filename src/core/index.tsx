import {
    getContentResourcePathById,
    GetContentResourcePathRequest,
} from "../api/content";
import {
    getLiveTokenByScheduleId,
    GetLiveTokenByScheduleIdRequest,
    GetLiveTokenByScheduleIdResponse,
    getScheduleById,
    GetScheduleByIdRequest,
    GetScheduleByIdResponse,
    postScheduleFeedback,
    PostScheduleFeedbackRequest,
    PostScheduleFeedbackResponse,
    postSchedulesTimeViewList,
    PostSchedulesTimeViewListRequest,
    PostSchedulesTimeViewListResponse,
} from "../api/schedule";
import { RequestConfigOptions } from "../api/shared";
import axios,
{
    AxiosDefaults,
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";
import React,
{
    createContext,
    useCallback,
    useContext,
    useMemo,
} from "react";
import {
    DefaultOptions,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
    QueryClientProviderProps,
} from "react-query";

interface CmsApiActions {
    getScheduleById: (request: GetScheduleByIdRequest, options?: RequestConfigOptions) => Promise<GetScheduleByIdResponse>;
    getLiveTokenByScheduleId: (request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigOptions) => Promise<GetLiveTokenByScheduleIdResponse>;
    postSchedulesTimeViewList: (request: PostSchedulesTimeViewListRequest, options?: RequestConfigOptions) => Promise<PostSchedulesTimeViewListResponse>;
    postAddScheduleFeedback: (request: PostScheduleFeedbackRequest, options?: RequestConfigOptions) => Promise<PostScheduleFeedbackResponse>;
    getContentResourcePathById: (request: GetContentResourcePathRequest, options?: RequestConfigOptions) => Promise<Blob>;
}

interface CmsApiClient {
    queryClient: QueryClient;
    axiosClient: AxiosInstance;
    updateHttpConfig: (config: Partial<AxiosDefaults>) => void;
    actions: CmsApiActions;
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

class CmsApiClientNoProviderError extends Error {
    constructor () {
        super(`useCmsApiClient must be used within a CmsApiClientContext.Provider`);
        this.name = `NO_PROVIDER`;
    }
}

const CmsApiClientContext = createContext<CmsApiClient>({
    queryClient: (null as unknown) as QueryClient,
    axiosClient: (null as unknown) as AxiosInstance,
    updateHttpConfig: () => { throw new CmsApiClientNoProviderError(); },
    actions: {
        getScheduleById: () => { throw new CmsApiClientNoProviderError(); },
        getLiveTokenByScheduleId: () => { throw new CmsApiClientNoProviderError(); },
        postSchedulesTimeViewList: () => { throw new CmsApiClientNoProviderError(); },
        postAddScheduleFeedback: () => { throw new CmsApiClientNoProviderError(); },
        getContentResourcePathById: () => { throw new CmsApiClientNoProviderError(); },
    },
});

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
        return getScheduleById(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const getLiveTokenByScheduleIdAction = useCallback((request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigOptions) => {
        return getLiveTokenByScheduleId(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const postSchedulesTimeViewListAction = useCallback((request: PostSchedulesTimeViewListRequest, options?: RequestConfigOptions) => {
        return postSchedulesTimeViewList(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const postAddScheduleFeedbackAction = useCallback((request: PostScheduleFeedbackRequest, options?: RequestConfigOptions) => {
        return postScheduleFeedback(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const getContentResourcePathByIdAction = useCallback((request: GetContentResourcePathRequest, options?: RequestConfigOptions) => {
        return getContentResourcePathById(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const actions = useMemo(() => {
        return {
            getScheduleById: getScheduleByIdAction,
            getLiveTokenByScheduleId: getLiveTokenByScheduleIdAction,
            postSchedulesTimeViewList: postSchedulesTimeViewListAction,
            postAddScheduleFeedback: postAddScheduleFeedbackAction,
            getContentResourcePathById: getContentResourcePathByIdAction,
        };
    }, [
        getScheduleByIdAction,
        getLiveTokenByScheduleIdAction,
        postSchedulesTimeViewListAction,
        postAddScheduleFeedbackAction,
        getContentResourcePathByIdAction,
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
        throw new CmsApiClientNoProviderError();
    }
    return context;
};
