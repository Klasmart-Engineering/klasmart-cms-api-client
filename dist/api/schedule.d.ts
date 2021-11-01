import { ForeignIdName, RequestQueryOptions } from "./shared";
export declare enum ScheduleClassType {
    LIVE = "OnlineClass",
    CLASSES = "OfflineClass",
    STUDY = "Homework",
    TASK = "Task"
}
declare type RepeatEndType = `never` | `after_count` | `after_time`;
declare type ScheduleRepeatType = "daily" | "weekly" | "monthly" | "yearly";
interface RepeatEnd {
    after_count: number;
    after_time: number;
    type: RepeatEndType;
}
interface ScheduleRepeatDetail {
    end: RepeatEnd;
    interval?: number;
}
declare type ScheduleRepeat = {
    type?: ScheduleRepeatType;
    daily: ScheduleRepeatDetail;
    weekly: ScheduleRepeatDetail;
    monthly: ScheduleRepeatDetail;
    yearly: ScheduleRepeatDetail;
};
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
export interface GetScheduleByIdRequest {
    scheduleId: string;
}
export declare function useGetScheduleById(request: GetScheduleByIdRequest, options?: RequestQueryOptions): import("react-query").UseQueryResult<unknown, unknown>;
export {};
