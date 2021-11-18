import { client } from "../core";
import {
    BaseRequest,
    ForeignIdName,
    RequestConfigOptions,
    RequestConfigQueryOptions,
} from "./shared";
import { useQuery } from "react-query";

export type ScheduleClassType = `OnlineClass` | `OfflineClass` | `Homework` | `Task`;
export type AssessmentStatus = `complete` | `in_progress`;
export type ScheduleStatus = `NotStart` | `Started` | `Closed`;
export type RepeatEndType = `never` | `after_count` | `after_time`;
export type ScheduleRepeatType = `daily` | `weekly` | `monthly` | `yearly`;
export type ScheduleViewType = `day` | `work_week` | `week` | `month` | `year` | `full_view`
export type ScheduleLiveTokenType = `live` | `preview`;
export type TimeBoundary = `intersect` | `union`;

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

interface GetScheduleByIdRequest extends BaseRequest {
    schedule_id: string;
}

export interface GetScheduleByIdResponse {
    attachment: ForeignIdName;
    class: ForeignIdName;
    class_roster_student: any; // TODO
    class_roster_teacher: any; // TODO
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
    participants_student: any; // TODO
    participants_teacher: any; // TODO
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

export async function getScheduleById (request: GetScheduleByIdRequest, options?: RequestConfigOptions) {
    const { schedule_id, ...rest } = request;
    const resp = await client.get<GetScheduleByIdResponse>(`/v1/schedules/${schedule_id}`, {
        params: {
            ...rest,
            ...options?.config?.params,
        },
        ...options?.config,
    });
    return resp.data;
}

export function useGetScheduleById (request: GetScheduleByIdRequest, options?: RequestConfigQueryOptions<GetScheduleByIdResponse>) {
    return useQuery([ `getScheduleByID`, request ], () => getScheduleById(request, options), options?.queryOptions);
}

interface GetLiveTokenByScheduleIdRequest extends BaseRequest {
    schedule_id: string;
    live_token_type: ScheduleLiveTokenType;
}

interface GetLiveTokenByScheduleIdResponse {
    token: string;
}

export async function getLiveTokenByScheduleId (request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigOptions) {
    const { schedule_id, ...rest } = request;
    const resp = await client.get<GetLiveTokenByScheduleIdResponse>(`/v1/schedules/${schedule_id}/live/token`, {
        params: {
            ...rest,
            ...options?.config?.params,
        },
        ...options?.config,
    });
    return resp.data;
}

export function useGetLiveTokenByScheduleId (request: GetLiveTokenByScheduleIdRequest, options?: RequestConfigQueryOptions<GetLiveTokenByScheduleIdResponse>) {
    return useQuery([ `getScheduleByID`, request ], () => getLiveTokenByScheduleId(request, options), options?.queryOptions);
}

interface PostSchedulesTimeViewListRequest extends BaseRequest {
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

interface PostSchedulesTimeViewListResponse {
    data: SchedulesTimeViewListItem[];
    total: number;
}

export async function postSchedulesTimeViewList (request: PostSchedulesTimeViewListRequest, options?: RequestConfigOptions) {
    const { org_id, ...rest } = request;
    const resp = await client.post<PostSchedulesTimeViewListResponse>(`/v1/schedules_time_view/list`, rest, {
        params: {
            org_id,
            ...options?.config?.params,
        },
        ...options?.config,
    });
    return resp.data;
}

export function usePostSchedulesTimeViewList (request: PostSchedulesTimeViewListRequest, options?: RequestConfigQueryOptions<PostSchedulesTimeViewListResponse>) {
    return useQuery([ `getScheduleTimeViewList`, request ], () => postSchedulesTimeViewList(request, options), options?.queryOptions);
}
