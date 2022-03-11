import { useCmsApiClient } from "../core";
import { ScheduleClassType } from "./schedule";
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

export type AssessmentStatus = `complete` | `in_progress`;
export type AssessmentSearchType = `home_fun_study`;

export interface StudentAttachment {
    id: string;
    name: string;
}

export interface StudentSchedule {
    attachment: StudentAttachment;
    id: string;
    title: string;
    type: ScheduleClassType;
}

export interface TeacherComment {
    comment: string;
    teacher: TeacherProfile;
}

export interface TeacherProfile {
    avatar: string;
    family_name: string;
    given_name: string;
    id: string;
}

export interface StudentAssessment {
    complete_at: number;
    create_at: number;
    id: string;
    schedule: StudentSchedule;
    score: number;
    status: AssessmentStatus;
    student_attachments: StudentAttachment[];
    teacher_comments: TeacherComment[];
    title: string;
    update_at: number;
}

export interface GetAssessmentsSummaryRequest extends BaseRequest {
}

export type GetAssessmentsSummaryResponse = {
    [key in AssessmentStatus]: number;
}

export async function getAssessmentsSummary (client: AxiosInstance, request: GetAssessmentsSummaryRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<GetAssessmentsSummaryResponse>(`/v1/assessments_summary`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_ASSESSMENTS_SUMMARY_QUERY_KEY: QueryKey = `getAssessmentsSummary`;

export function useGetAssessmentsSummary (request: GetAssessmentsSummaryRequest, options?: RequestConfigQueryOptions<GetAssessmentsSummaryResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_ASSESSMENTS_SUMMARY_QUERY_KEY, request ], () => getAssessmentsSummary(axiosClient, request, options?.config), options?.queryOptions);
}

export interface GetStudentAssessmentsRequest extends BaseRequest {
    type: AssessmentSearchType;
    status?: string;
    order_by?: string;
    teacher_id?: string;
    assessment_id?: string;
    schedule_ids?: string;
    create_at_ge?: number;
    create_at_le?: number;
    update_at_ge?: number;
    update_at_le?: number;
    complete_at_ge?: number;
    complete_at_le?: number;
    page?: number;
    page_size?: number;
}

export interface GetStudentAssessmentsResponse {
    list: StudentAssessment[];
    total: number;
}

export async function getStudentAssessments (client: AxiosInstance, request: GetStudentAssessmentsRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<GetStudentAssessmentsResponse>(`/v1/assessments_for_student`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_STUDENT_ASSESSMENTS_QUERY_KEY: QueryKey = `getStudentAssessments`;

export function useGetStudentAssessments (request: GetStudentAssessmentsRequest, options?: RequestConfigQueryOptions<GetStudentAssessmentsResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_STUDENT_ASSESSMENTS_QUERY_KEY, request ], () => getStudentAssessments(axiosClient, request, options?.config), options?.queryOptions);
}
