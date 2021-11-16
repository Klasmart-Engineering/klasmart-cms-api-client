import { BaseRequest, ForeignIdName, RequestConfigOptions, RequestConfigQueryOptions } from "./shared";
export declare enum ScheduleClassType {
    LIVE = "OnlineClass",
    CLASSES = "OfflineClass",
    STUDY = "Homework",
    TASK = "Task"
}
export declare enum AssessmentStatus {
    COMPLETE = "complete",
    IN_PROGRESS = "in_progress"
}
export declare enum ScheduleStatus {
    NOT_START = "NotStart",
    STARTED = "Started",
    CLOSED = "Closed"
}
declare type RepeatEndType = `never` | `after_count` | `after_time`;
declare type ScheduleRepeatType = `daily` | `weekly` | `monthly` | `yearly`;
declare type ScheduleViewType = `day` | `work_week` | `week` | `month` | `year` | `full_view`;
interface RepeatEnd {
    after_count: number;
    after_time: number;
    type: RepeatEndType;
}
interface ScheduleRepeatDetail {
    end: RepeatEnd;
    interval?: number;
}
interface ScheduleRepeat {
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
export declare enum ScheduleLiveTokenType {
    LIVE = "live",
    PREVIEW = "preview"
}
interface GetScheduleByIdRequest extends BaseRequest {
    schedule_id: string;
}
export interface GetScheduleByIdResponse {
    attachment: ForeignIdName;
    class: ForeignIdName;
    class_roster_student: any;
    class_roster_teacher: any;
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
    participants_student: any;
    participants_teacher: any;
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
export declare function getScheduleById(request: GetScheduleByIdRequest, options?: RequestConfigOptions): Promise<GetScheduleByIdResponse>;
export declare function useGetScheduleById(request: GetScheduleByIdRequest, options?: RequestConfigQueryOptions<GetScheduleByIdResponse>): import("react-query").UseQueryResult<GetScheduleByIdResponse, unknown>;
interface GetLiveTokenByScheduleIdRequest extends BaseRequest {
    schedule_id: string;
    live_token_type: ScheduleLiveTokenType;
}
interface GetLiveTokenByScheduleIdResponse {
    token: string;
}
export declare function getLiveTokenByScheduleId(request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigOptions): Promise<GetLiveTokenByScheduleIdResponse>;
export declare function useGetLiveTokenByScheduleId(request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigQueryOptions<GetLiveTokenByScheduleIdResponse>): import("react-query").UseQueryResult<GetLiveTokenByScheduleIdResponse, unknown>;
interface PostSchedulesTimeViewListRequest extends BaseRequest {
    anytime?: boolean;
    class_ids?: string[];
    class_types?: ScheduleClassType[];
    due_at_eq?: number;
    end_at_le?: number;
    order_by?: string;
    page?: number;
    page_size?: number;
    program_ids?: string[];
    school_ids?: string[];
    start_at_ge?: number;
    subject_ids?: string[];
    teacher_ids?: string[];
    time_at: number;
    time_zone_offset: number;
    view_type: ScheduleViewType;
    with_assessment_status?: boolean;
}
interface PostSchedulesTimeViewListResponse {
    data: SchedulesTimeViewListItem[];
    total: number;
}
export declare function postSchedulesTimeViewList(request: PostSchedulesTimeViewListRequest, options?: RequestConfigOptions): Promise<PostSchedulesTimeViewListResponse>;
export declare function usePostSchedulesTimeViewList(request: PostSchedulesTimeViewListRequest, options?: RequestConfigQueryOptions<PostSchedulesTimeViewListResponse>): import("react-query").UseQueryResult<PostSchedulesTimeViewListResponse, unknown>;
export {};
