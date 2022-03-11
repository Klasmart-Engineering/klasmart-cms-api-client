import { GetAssessmentsSummaryRequest, GetAssessmentsSummaryResponse, GetStudentAssessmentsRequest, GetStudentAssessmentsResponse } from "../api/assessment";
import { GetContentResourcePathRequest } from "../api/content";
import { GetLiveTokenByScheduleIdRequest, GetLiveTokenByScheduleIdResponse, GetScheduleByIdRequest, GetScheduleByIdResponse, GetScheduleNewestFeedbackByIdRequest, GetScheduleNewestFeedbackByIdResponse, PostScheduleFeedbackRequest, PostScheduleFeedbackResponse, PostSchedulesTimeViewListRequest, PostSchedulesTimeViewListResponse } from "../api/schedule";
import { RequestConfigOptions } from "../api/shared";
import { AxiosDefaults, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import React from "react";
import { DefaultOptions, MutationCache, QueryCache, QueryClient, QueryClientProviderProps } from "react-query";
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
export declare function CmsApiClientProvider(props: ProviderProps): JSX.Element;
export declare const useCmsApiClient: () => CmsApiClient;
export {};
