import { client } from "../core";
import {
    ForeignIdName,
    RequestMutationOptions,
    RequestQueryOptions,
} from "./shared";
import {
    useMutation,
    useQuery,
} from "react-query";

export enum ScheduleClassType {
    LIVE = `OnlineClass`, // live
    CLASSES = `OfflineClass`, // classes
    STUDY = `Homework`, // study
    TASK = `Task` // task
}

type RepeatEndType = `never` | `after_count` | `after_time`;
type ScheduleRepeatType = "daily" | "weekly" | "monthly" | "yearly";

interface RepeatEnd {
    after_count: number;
    after_time: number;
    type: RepeatEndType;
}
interface ScheduleRepeatDetail {
    end: RepeatEnd;
    interval?: number;
}
type ScheduleRepeat = {
    type?: ScheduleRepeatType;
    daily: ScheduleRepeatDetail;
    weekly: ScheduleRepeatDetail;
    monthly: ScheduleRepeatDetail;
    yearly: ScheduleRepeatDetail;
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

export interface GetScheduleByIdRequest {
    scheduleId: string;
}

export function useGetScheduleById (request: GetScheduleByIdRequest, options?: RequestQueryOptions) {
    const { scheduleId } = request;
    return useQuery(`getScheduleByID=${scheduleId}`, async () => {
        const resp = await client.get<GetScheduleByIdResponse>(`products/${scheduleId}`, options?.config);
        return resp.data;
    }, options?.queryOptions);
}

// export function usePostSchedulesFeedbacks (request: GetScheduleByIdRequest, options?: RequestMutationOptions) {
//     const { scheduleId } = request;
//     return useMutation(`getScheduleByID=${scheduleId}`, async () => {
//         const resp = await client.get<GetScheduleByIdResponse>(`/v1/schedules_feedbacks/${scheduleId}`, options?.config);
//         return resp.data;
//     }, options?.mutationOptions);
// }
