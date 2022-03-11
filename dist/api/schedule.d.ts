import { AssessmentStatus } from "./assessment";
import { BaseRequest, ForeignIdName, RequestConfigMutationOptions, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { MutationKey, QueryKey } from "react-query";
export declare type ScheduleClassType = `OnlineClass` | `OfflineClass` | `Homework` | `Task`;
export declare type ScheduleStatus = `NotStart` | `Started` | `Closed`;
export declare type RepeatEndType = `never` | `after_count` | `after_time`;
export declare type ScheduleRepeatType = `daily` | `weekly` | `monthly` | `yearly`;
export declare type ScheduleViewType = `day` | `work_week` | `week` | `month` | `year` | `full_view`;
export declare type ScheduleLiveTokenType = `live` | `preview`;
export declare type TimeBoundary = `intersect` | `union`;
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
    exist_feedback: boolean;
    exist_assessment: boolean;
    complete_assessment: boolean;
    lesson_plan: ForeignIdName;
    member_teachers: ForeignIdName[];
    org_id: string;
    participants_students: ScheduleAccessibleUserView[] | null;
    participants_teachers: ScheduleAccessibleUserView[] | null;
    program: ForeignIdName;
    real_time_status: {
        id: string;
        lesson_plan_is_auth: boolean;
    };
    repeat: ScheduleRepeat;
    start_at: number;
    student_count: number;
    subject: ForeignIdName;
    teachers: ForeignIdName[];
    title: string;
    version: number;
}
export declare function getScheduleById(client: AxiosInstance, request: GetScheduleByIdRequest, config?: AxiosRequestConfig): Promise<GetScheduleByIdResponse>;
export declare const GET_SCHEDULE_BY_ID_QUERY_KEY: QueryKey;
export declare function useGetScheduleById(request: GetScheduleByIdRequest, options?: RequestConfigQueryOptions<GetScheduleByIdResponse>): import("react-query").UseQueryResult<GetScheduleByIdResponse, unknown>;
export interface GetLiveTokenByScheduleIdRequest extends BaseRequest {
    schedule_id: string;
    live_token_type: ScheduleLiveTokenType;
}
export interface GetLiveTokenByScheduleIdResponse {
    token: string;
}
export declare function getLiveTokenByScheduleId(client: AxiosInstance, request: GetLiveTokenByScheduleIdRequest, config?: AxiosRequestConfig): Promise<GetLiveTokenByScheduleIdResponse>;
export declare const GET_LIVE_TOKEN_BY_SCHEDULE_ID_QUERY_KEY: QueryKey;
export declare function useGetLiveTokenByScheduleId(request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigQueryOptions<GetLiveTokenByScheduleIdResponse>): import("react-query").UseQueryResult<GetLiveTokenByScheduleIdResponse, unknown>;
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
export declare function postSchedulesTimeViewList(client: AxiosInstance, request: PostSchedulesTimeViewListRequest, config?: AxiosRequestConfig): Promise<PostSchedulesTimeViewListResponse>;
export declare const GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY: QueryKey;
export declare function usePostSchedulesTimeViewList(request: PostSchedulesTimeViewListRequest, options?: RequestConfigQueryOptions<PostSchedulesTimeViewListResponse>): import("react-query").UseQueryResult<PostSchedulesTimeViewListResponse, unknown>;
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
export declare function postScheduleFeedback(client: AxiosInstance, request: PostScheduleFeedbackRequest, config?: AxiosRequestConfig): Promise<PostScheduleFeedbackResponse>;
export declare const POST_SCHEDULE_FEEDBACK_MUTATION_KEY: MutationKey;
export declare function usePostScheduleFeedback(request?: PostScheduleFeedbackRequest, options?: RequestConfigMutationOptions<PostScheduleFeedbackResponse, PostScheduleFeedbackRequest>): import("react-query").UseMutationResult<PostScheduleFeedbackResponse, unknown, PostScheduleFeedbackRequest, unknown>;
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
export declare function getScheduleNewestFeedbackById(client: AxiosInstance, request: GetScheduleNewestFeedbackByIdRequest, config?: AxiosRequestConfig): Promise<GetScheduleNewestFeedbackByIdResponse>;
export declare const GET_SCHEDULE_NEWEST_FEEDBACK_BY_ID_QUERY_KEY: QueryKey;
export declare function useGetScheduleNewestFeedbackById(request: GetScheduleNewestFeedbackByIdRequest, options?: RequestConfigQueryOptions<GetScheduleNewestFeedbackByIdResponse>): import("react-query").UseQueryResult<GetScheduleNewestFeedbackByIdResponse, unknown>;
