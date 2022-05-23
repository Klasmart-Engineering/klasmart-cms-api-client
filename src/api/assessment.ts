import { useCmsApiClient } from "../core";
import { ScheduleClassType } from "./schedule";
import {
    BaseRequest,
    ForeignIdName,
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
export type AssessmentsOrder = `class_end_time` | `-class_end_time` | `complete_time` | `-complete_time`;
export type AssessmentType = `OnlineClass` | `OfflineClass` | `Homework` | `Task` | `OnlineStudy` | `OfflineStudy`;
export type AssessmentStudentStatus = `Participate` | `NotParticipate`;
export type AssessmentStudentResultOutcomeStatus = `Unknown` | `NotCovered` | `NotAchieved` | `Achieved`;
export enum AssessmentScore {
    POOR = 1,
    FAIR = 2,
    AVERAGE = 3,
    GOOD = 4,
    EXCELLENT = 5,
}

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

export interface AssessmentItem {
    id: string;
    title: string;
    subject: ForeignIdName;
    program: ForeignIdName;
    teachers: ForeignIdName[] | null;
    class_end_time: number;
    complete_time: number;
    status: AssessmentStatus;
}

export interface GetAssessmentsRequest extends BaseRequest {
    page?: number;
    page_size?: number;
    status?: string;
    teacher_name?: string;
    class_type?: string;
    order_by?: AssessmentsOrder;
}

export interface GetAssessmentsResponse {
    items: AssessmentItem[];
    total: number;
}

export async function getAssessments (client: AxiosInstance, request: GetAssessmentsRequest, config?: AxiosRequestConfig) {
    const resp = await client.get<GetAssessmentsResponse>(`/v1/assessments`, {
        ...config,
        params: {
            ...request,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_ASSESSMENTS_QUERY_KEY: QueryKey = `getAssessments`;

export function useGetAssessments (request: GetAssessmentsRequest, options?: RequestConfigQueryOptions<GetAssessmentsResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_ASSESSMENTS_QUERY_KEY, request ], () => getAssessments(axiosClient, request, options?.config), options?.queryOptions);
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

export interface AssessmentStudent{
    proccess_status: string;
    student_id: string;
    student_name: string;
    status: AssessmentStudentStatus;
    reviewer_comment: string;
    results: AssessmentStudentResult[];
}

export interface AssessmentStudentResult{
    answer: string;
    assess_score: AssessmentScore;
    attempted: boolean;
    content_id: string;
    score: number;
    outcomes: AssessmentStudentResultOutcome[];
}

export interface AssessmentStudentResultOutcome{
    outcome_id: string;
    status: AssessmentStudentResultOutcomeStatus;
}

export interface GetAssessmentByIdRequest extends BaseRequest {
    assessment_id: string;
}

export interface GetAssessmentByIdResponse{
    id: string;
    assessment_type: string;
    class: ForeignIdName;
    class_end_at: number;
    class_length: number;
    complete_at: number;
    complete_rate: number;
    description: string;
    remaining_time: number;
    room_id: string;
    teachers: ForeignIdName[];
    subjects: ForeignIdName[];
    title: string;
    status: AssessmentStatus;
    students: AssessmentStudent[];
    schedule_title: string;
}

export async function getAssessmentById (client: AxiosInstance, request: GetAssessmentByIdRequest, config?: AxiosRequestConfig){
    const { assessment_id, ...rest } = request;
    const resp = await client.get<GetAssessmentByIdResponse>(`/v1/assessments_v2/${assessment_id}`, {
        params: {
            ...rest,
            ...config?.params,
        },
    });
    return resp.data;
}

export const GET_ASSESSMENT_BY_ID_QUERY_KEY: QueryKey = `getAssessmentById`;

export function useGetAssessmentById (request: GetAssessmentByIdRequest, options?: RequestConfigQueryOptions<GetAssessmentByIdResponse>) {
    const { axiosClient } = useCmsApiClient();
    return useQuery([ GET_ASSESSMENT_BY_ID_QUERY_KEY, request ], () => getAssessmentById(axiosClient, request, options?.config), options?.queryOptions);
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
