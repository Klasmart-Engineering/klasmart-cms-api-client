import { useCmsApiClient } from "../core";
import {
    BaseRequest,
    RequestConfigQueryOptions,
} from "./shared";
import {
    AxiosInstance,
    AxiosRequestConfig,
} from "axios";
import {
    QueryKey,
    useQuery,
} from "react-query";

export interface GetAssignmentsRequest extends BaseRequest {
  year: number;
  week_start: number;
  week_end: number;
  school_id?: string;
  class_id: string;
  teacher_id?: string;
  student_id: string;
  subject_id?: string;
}

export interface GetAssignmentsItem {
  assessment_id: string;
  assessment_title: string;
  assessment_type: string;
  complete_at: number;
  create_at: number;
  lesson_plan_name: string;
  schedule_id: string;
  status: string;
  teacher_feedback: string;
}

export interface GetAssignmentsResponse {
  home_fun_study_count: number;
  items: [GetAssignmentsItem];
  study_count: number;
}

export async function getAssignmentClassesSummary (client: AxiosInstance, request: GetAssignmentsRequest, config?: AxiosRequestConfig) {
    let resp;
    try {
        resp = await client.get<GetAssignmentsResponse>(`/v1/reports/learning_summary/assignments_v2`, {
            ...config,
            params: {
                ...request,
                ...config?.params,
            },
        });

        return resp.data;
    } catch (error) {
        throw new Error(`error ${error}`);
    }
}

export const GET_ASSIGNMENTS_ID_MUTATION_KEY: QueryKey = `assignmentsClassesSummary`;

export function useGetAssignmentClassesSummary (request: GetAssignmentsRequest, options?: RequestConfigQueryOptions<GetAssignmentsResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_ASSIGNMENTS_ID_MUTATION_KEY, request ], () => getAssignmentClassesSummary(axiosClient, request, options?.config), options?.queryOptions);

}

export interface GetLiveClassesSummaryRequest extends BaseRequest {
  year: number;
  week_start: number;
  week_end: number;
  school_id?: string;
  class_id: string;
  teacher_id?: string;
  student_id: string;
  subject_id?: string;
}

export interface GetLiveClassesItem {
  absent: boolean;
  assessment_id: string;
  class_start_time: number;
  complete_at: number;
  create_at: number;
  lesson_plan_name: string;
  schedule_id: string;
  schedule_title: string;
  teacher_feedback: string;
}

export interface GetLiveClassesSummaryResponse {
  attend: number;
  items: [GetLiveClassesItem];
}

export async function getLiveClassesSummary (client: AxiosInstance, request: GetLiveClassesSummaryRequest, config?: AxiosRequestConfig) {
    let resp;
    try {
        resp = await client.get<GetLiveClassesSummaryResponse>(`/v1/reports/learning_summary/live_classes_v2`, {
            ...config,
            params: {
                ...request,
                ...config?.params,
            },
        });

        return resp.data;
    } catch (error) {
        throw new Error(`error ${error}`);
    }
}

export const GET_LIVE_CLASSES_SUMMARY_ID_MUTATION_KEY: QueryKey = `liveClassesSummary`;

export function useGetLiveClassesSummary (request: GetLiveClassesSummaryRequest, options?: RequestConfigQueryOptions<GetLiveClassesSummaryResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_LIVE_CLASSES_SUMMARY_ID_MUTATION_KEY, request ], () => getLiveClassesSummary(axiosClient, request, options?.config), options?.queryOptions);

}

export interface GetLearningOutComesRequest extends BaseRequest {
  assessment_id: string;
  student_id: string;
}

export interface GetLearningOutComesResponse {
  id: string;
  name: string;
  status: string;
}

export async function getLearningOutcomes (client: AxiosInstance, request: GetLearningOutComesRequest, config?: AxiosRequestConfig) {
    let resp;
    try {
        resp = await client.get<[GetLearningOutComesResponse]>(`/v1/reports/learning_summary/outcomes`, {
            ...config,
            params: {
                ...request,
                ...config?.params,
            },
        });

        return resp.data;
    } catch (error) {
        throw new Error(`error ${error}`);
    }
}

export const GET_LEARNING_OUTCOMES_ID_MUTATION_KEY: QueryKey = `learningOutComes`;

export function useGetLearningOutcomes (request: GetLearningOutComesRequest, options?: RequestConfigQueryOptions<[GetLearningOutComesResponse]>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_LEARNING_OUTCOMES_ID_MUTATION_KEY, request ], () => getLearningOutcomes(axiosClient, request, options?.config), options?.queryOptions);

}

export interface GetAppInsightMessagesRequest extends BaseRequest {
  class_id: string;
  student_id: string;
  end_time: number;
}

export interface AssignmentLabelItems {
  assign_compare_3_week: number;
  assign_compare_class: number;
  assign_compare_class_3_week: number;
  assign_compare_last_week: number;
  assign_complete_count: number;
  assignment_complete_count: number;
  assignment_count: number;
}

export interface AttendanceLabelItems {
  attend_compare_last_3_week: number;
  attend_compare_last_week: number;
  attended_count: number;
  lo_compare_class: number;
  lo_compare_class_3_week: number;
  scheduled_count: number;
}

export interface LearningOutComeAchivement {
  achieved_lo_count: number;
  learnt_lo_count: number;
  lo_compare_class: number;
  lo_compare_class_3_week: number;
  lo_compare_last_3_week: number;
  lo_compare_last_week: number;
  lo_review_compare_class: number;
}

export interface GetAppInsightMessagesResponse {
  assignment_label_id: string;
  assignment_label_params: AssignmentLabelItems;
  attedance_label_id: string;
  attedance_label_params: AttendanceLabelItems;
  learning_outcome_achivement_label_id: string;
  learning_outcome_achivement_label_params: LearningOutComeAchivement;
}

export async function getAppInsightMessage (client: AxiosInstance, request: GetAppInsightMessagesRequest, config?: AxiosRequestConfig) {
    let resp;
    try {
        resp = await client.get<GetAppInsightMessagesResponse>(`/v1/reports/student_progress/app/insight_message`, {
            ...config,
            params: {
                ...request,
                ...config?.params,
            },
        });

        return resp.data;
    } catch (error) {
        throw new Error(`error ${error}`);
    }
}

export const GET_INSIGTH_MESSAGE_ID_MUTATION_KEY: QueryKey = `getAppInsightMessage`;

export function useGetAppInsightMessage (request: GetAppInsightMessagesRequest, options?: RequestConfigQueryOptions<GetAppInsightMessagesResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_LEARNING_OUTCOMES_ID_MUTATION_KEY, request ], () => getAppInsightMessage(axiosClient, request, options?.config), options?.queryOptions);

}
