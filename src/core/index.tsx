import {
    getAssessmentsSummary,
    GetAssessmentsSummaryRequest,
    GetAssessmentsSummaryResponse,
    getStudentAssessments,
    GetStudentAssessmentsRequest,
    GetStudentAssessmentsResponse,
} from "../api/assessment";
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
    getScheduleNewestFeedbackById,
    GetScheduleNewestFeedbackByIdRequest,
    GetScheduleNewestFeedbackByIdResponse,
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
    getScheduleNewestFeedbackById: (request: GetScheduleNewestFeedbackByIdRequest, options?: RequestConfigOptions) => Promise<GetScheduleNewestFeedbackByIdResponse>;
    getContentResourcePathById: (request: GetContentResourcePathRequest, options?: RequestConfigOptions) => Promise<Blob>;
    getStudentAssessments: (request: GetStudentAssessmentsRequest, options?: RequestConfigOptions) => Promise<GetStudentAssessmentsResponse>;
    getAssessmentsSummary: (request: GetAssessmentsSummaryRequest, options?: RequestConfigOptions) => Promise<GetAssessmentsSummaryResponse>;
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
    responseInterceptors?: {
        onFulfilled?: ((value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>) | undefined;
        onRejected?: ((error: AxiosError) => any) | undefined;
    }[];
    requestInterceptors?: {
        onFulfilled?: ((value: AxiosRequestConfig<any>) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>) | undefined;
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
        getScheduleNewestFeedbackById: () => { throw new CmsApiClientNoProviderError(); },
        getContentResourcePathById: () => { throw new CmsApiClientNoProviderError(); },
        getStudentAssessments: () => { throw new CmsApiClientNoProviderError(); },
        getAssessmentsSummary: () => { throw new CmsApiClientNoProviderError(); },
    },
});

export function CmsApiClientProvider (props: ProviderProps) {
    const {
        children,
        config,
        queryOptions,
        responseInterceptors,
        requestInterceptors,
        ...rest
    } = props;

    const queryClient = useMemo(() => new QueryClient(queryOptions), [ queryOptions ]);
    const axiosClient = useMemo(() => {
        const client = axios.create(config);

        for (const interceptor of requestInterceptors ?? []) {
            client.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        for (const interceptor of responseInterceptors ?? []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }

        return client;
    }, [
        config,
        responseInterceptors,
        requestInterceptors,
    ]);

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

    const getScheduleNewestFeedbackByIdAction = useCallback((request: GetScheduleNewestFeedbackByIdRequest, options?: RequestConfigOptions) => {
        return getScheduleNewestFeedbackById(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const getContentResourcePathByIdAction = useCallback((request: GetContentResourcePathRequest, options?: RequestConfigOptions) => {
        return getContentResourcePathById(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const getStudentAssessmentsAction = useCallback((request: GetStudentAssessmentsRequest, options?: RequestConfigOptions) => {
        return getStudentAssessments(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const getAssessmentsSummaryAction = useCallback((request: GetAssessmentsSummaryRequest, options?: RequestConfigOptions) => {
        return getAssessmentsSummary(axiosClient, request, options?.config);
    }, [ axiosClient ]);

    const actions = useMemo(() => {
        return {
            getScheduleById: getScheduleByIdAction,
            getLiveTokenByScheduleId: getLiveTokenByScheduleIdAction,
            postSchedulesTimeViewList: postSchedulesTimeViewListAction,
            postAddScheduleFeedback: postAddScheduleFeedbackAction,
            getScheduleNewestFeedbackById: getScheduleNewestFeedbackByIdAction,
            getContentResourcePathById: getContentResourcePathByIdAction,
            getStudentAssessments: getStudentAssessmentsAction,
            getAssessmentsSummary: getAssessmentsSummaryAction,
        };
    }, [
        getScheduleByIdAction,
        getLiveTokenByScheduleIdAction,
        postSchedulesTimeViewListAction,
        postAddScheduleFeedbackAction,
        getScheduleNewestFeedbackByIdAction,
        getContentResourcePathByIdAction,
        getStudentAssessmentsAction,
        getAssessmentsSummaryAction,
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
