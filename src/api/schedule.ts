import { useCmsApiClient } from "../core";
import { AssessmentStatus } from "./assessment";
import {
    BaseRequest,
    ForeignIdName,
    RequestConfigMutationOptions,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";
import {
    MutationKey,
    QueryKey,
    useMutation,
    useQuery,
    useQueryClient,
} from "react-query";

export type ScheduleClassType = `OnlineClass` | `OfflineClass` | `Homework` | `Task`;
export type ScheduleStatus = `NotStart` | `Started` | `Closed`;
export type RepeatEndType = `never` | `after_count` | `after_time`;
export type ScheduleRepeatType = `daily` | `weekly` | `monthly` | `yearly`;
export type ScheduleViewType = `day` | `work_week` | `week` | `month` | `year` | `full_view`
export type ScheduleLiveTokenType = `live` | `preview`;
export type TimeBoundary = `intersect` | `union`;
export type ReviewStatusType = `pending` | `success` | `failed`;
export interface FeedbackAssignmentView {
    attachment_id: string;
    attachment_name: string;
    number: number;
}

export interface RepeatEnd {
    after_count: number;
    after_time: number;
    type: RepeatEndType;
}
export interface ScheduleRepeatDetail {
    end: RepeatEnd;
    interval?: number;
}
export interface ScheduleRepeat {
    type?: ScheduleRepeatType;
    daily: ScheduleRepeatDetail;
    weekly: ScheduleRepeatDetail;
    monthly: ScheduleRepeatDetail;
    yearly: ScheduleRepeatDetail;
}

export interface SchedulesTimeViewListItem {
    assessment_status: AssessmentStatus;
    class_id: string;
    class_type: ScheduleClassType;
    created_at: number;
    due_at: number;
    end_at: number;
    id: string;
    is_home_fun: boolean;
    is_review: boolean;
    content_start_at: number;
    content_end_at: number;
    review_status: ReviewStatusType;
    is_repeat: boolean;
    lesson_plan_id: string;
    start_at: number;
    status: ScheduleStatus;
    title: string;
}

export interface ScheduleAccessibleUserView {
    enable: boolean;
    id: string;
    name: string;
    type: string;
}

export interface GetScheduleByIdRequest extends BaseRequest {
    schedule_id: string;
}

export interface GetScheduleByIdResponse {
    attachment: ForeignIdName;
    class: ForeignIdName;
    class_roster_students: ScheduleAccessibleUserView[] | null;
    class_roster_teachers: ScheduleAccessibleUserView[] | null;
    class_type: ScheduleClassType;
    description: string;
    due_at: number;
    end_at: number;
    id: string;
    is_all_day: boolean;
    is_repeat: boolean;
    is_home_fun: boolean;
    is_review: boolean;
    content_start_at: number;
    content_end_at: number;
    review_status: ReviewStatusType;
    exist_feedback: boolean;
    exist_assessment: boolean;
    complete_assessment: boolean;
    lesson_plan: ForeignIdName;
    member_teachers: ForeignIdName[];
    org_id: string;
    participants_students: ScheduleAccessibleUserView[] | null;
    participants_teachers: ScheduleAccessibleUserView[] | null;
    program: ForeignIdName;
    real_time_status: { id: string; lesson_plan_is_auth: boolean };
    repeat: ScheduleRepeat;
    start_at: number;
    student_count: number;
    subject: ForeignIdName;
    teachers: ForeignIdName[];
    title: string;
    version: number;
}

export async function getScheduleById (client: AxiosInstance, request: GetScheduleByIdRequest, config?: AxiosRequestConfig) {
    const { schedule_id, ...rest } = request;
    const resp = await client.get<GetScheduleByIdResponse>(`/v1/schedules/${schedule_id}`, {
        ...config,
        params: {
            ...rest,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_SCHEDULE_BY_ID_QUERY_KEY: QueryKey = `getScheduleByID`;

export function useGetScheduleById (request: GetScheduleByIdRequest, options?: RequestConfigQueryOptions<GetScheduleByIdResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_SCHEDULE_BY_ID_QUERY_KEY, request ], () => getScheduleById(axiosClient, request, options?.config), options?.queryOptions);
}

export interface GetLiveTokenByScheduleIdRequest extends BaseRequest {
    schedule_id: string;
    live_token_type: ScheduleLiveTokenType;
}

export interface GetLiveTokenByScheduleIdResponse {
    token: string;
}

export async function getLiveTokenByScheduleId (client: AxiosInstance, request: GetLiveTokenByScheduleIdRequest, config?: AxiosRequestConfig) {
    const { schedule_id, ...rest } = request;
    const resp = await client.get<GetLiveTokenByScheduleIdResponse>(`/v1/schedules/${schedule_id}/live/token`, {
        ...config,
        params: {
            ...rest,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_LIVE_TOKEN_BY_SCHEDULE_ID_QUERY_KEY: QueryKey = `getScheduleByID`;

export function useGetLiveTokenByScheduleId (request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigQueryOptions<GetLiveTokenByScheduleIdResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_LIVE_TOKEN_BY_SCHEDULE_ID_QUERY_KEY, request ], () => getLiveTokenByScheduleId(axiosClient, request, options?.config), options?.queryOptions);
}

export interface PostSchedulesTimeViewListRequest extends BaseRequest {
    anytime?: boolean;
    class_ids?: string[];
    class_types?: ScheduleClassType[];
    due_at_eq?: number;
    end_at_le?: number;
    order_by?: string;
    page_size?: number;
    page?: number;
    program_ids?: string[];
    school_ids?: string[];
    start_at_ge?: number;
    subject_ids?: string[];
    teacher_ids?: string[];
    time_at: number;
    time_boundary?: TimeBoundary;
    time_zone_offset: number;
    view_type: ScheduleViewType;
    with_assessment_status?: boolean;
}

export interface PostSchedulesTimeViewListResponse {
    data: SchedulesTimeViewListItem[];
    total: number;
}

export async function postSchedulesTimeViewList (client: AxiosInstance, request: PostSchedulesTimeViewListRequest, config?: AxiosRequestConfig) {
    const { org_id, ...rest } = request;
    const resp = await client.post<PostSchedulesTimeViewListResponse>(`/v1/schedules_time_view/list`, rest, {
        ...config,
        params: {
            org_id,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY: QueryKey = `getScheduleTimeViewList`;

export function usePostSchedulesTimeViewList (request: PostSchedulesTimeViewListRequest, options?: RequestConfigQueryOptions<PostSchedulesTimeViewListResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY, request ], () => postSchedulesTimeViewList(axiosClient, request, options?.config), options?.queryOptions);
}

export interface PostScheduleFeedbackRequest extends BaseRequest {
    assignments: FeedbackAssignmentView[];
    comment: string;
    schedule_id: string;
  }

export interface PostScheduleFeedbackResponse {
    data: {
        id: string;
    };
    label: string;
}

export async function postScheduleFeedback (client: AxiosInstance, request: PostScheduleFeedbackRequest, config?: AxiosRequestConfig) {
    const { org_id, ...rest } = request;
    const resp = await client.post<PostScheduleFeedbackResponse>(`/v1/schedules_feedbacks`, rest, {
        ...config,
        params: {
            org_id,
            ...config?.params,
        },
    });
    return resp.data;
}

export const POST_SCHEDULE_FEEDBACK_MUTATION_KEY: MutationKey = `addScheduleFeedback`;

export function usePostScheduleFeedback (request?: PostScheduleFeedbackRequest, options?: RequestConfigMutationOptions<PostScheduleFeedbackResponse, PostScheduleFeedbackRequest>) {
    const { axiosClient } = useCmsApiClient();
    const queryClient = useQueryClient();
    return useMutation([ POST_SCHEDULE_FEEDBACK_MUTATION_KEY, request ], (request) => postScheduleFeedback(axiosClient, request, options?.config), {
        ...options?.mutationOptions,
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY);
            queryClient.invalidateQueries(GET_SCHEDULE_NEWEST_FEEDBACK_BY_ID_QUERY_KEY);
            options?.mutationOptions?.onSuccess?.(data, variables, context);
        },
    });
}

export interface GetScheduleNewestFeedbackByIdRequest extends BaseRequest {
    schedule_id: string;
  }

export interface GetScheduleNewestFeedbackByIdResponse {
    assignments: {
        attachment_id: string;
        attachment_name: string;
        number: number;
    }[];
    comment: string;
    create_at: number;
    id: string;
    is_allow_submit: boolean;
    schedule_id: string;
    user_id: string;
  }

export async function getScheduleNewestFeedbackById (client: AxiosInstance, request: GetScheduleNewestFeedbackByIdRequest, config?: AxiosRequestConfig) {
    const { schedule_id, ...rest } = request;
    const resp = await client.get<GetScheduleNewestFeedbackByIdResponse>(`/v1/schedules/${schedule_id}/operator/newest_feedback`, {
        ...config,
        params: {
            ...rest,
        },
    });
    return resp.data;
}

export const GET_SCHEDULE_NEWEST_FEEDBACK_BY_ID_QUERY_KEY: QueryKey = `getScheduleNewestFeedbackByOperator`;

export function useGetScheduleNewestFeedbackById (request: GetScheduleNewestFeedbackByIdRequest, options?: RequestConfigQueryOptions<GetScheduleNewestFeedbackByIdResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_SCHEDULE_NEWEST_FEEDBACK_BY_ID_QUERY_KEY, request ], () => getScheduleNewestFeedbackById(axiosClient, request, options?.config), options?.queryOptions);
}
