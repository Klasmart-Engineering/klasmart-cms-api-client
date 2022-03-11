import { ScheduleClassType } from "./schedule";
import { BaseRequest, RequestConfigQueryOptions } from "./shared";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { QueryKey } from "react-query";
export declare type AssessmentStatus = `complete` | `in_progress`;
export declare type AssessmentSearchType = `home_fun_study`;
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
export declare type GetAssessmentsSummaryResponse = {
    [key in AssessmentStatus]: number;
};
export declare function getAssessmentsSummary(client: AxiosInstance, request: GetAssessmentsSummaryRequest, config?: AxiosRequestConfig): Promise<GetAssessmentsSummaryResponse>;
export declare const GET_ASSESSMENTS_SUMMARY_QUERY_KEY: QueryKey;
export declare function useGetAssessmentsSummary(request: GetAssessmentsSummaryRequest, options?: RequestConfigQueryOptions<GetAssessmentsSummaryResponse>): import("react-query").UseQueryResult<GetAssessmentsSummaryResponse, unknown>;
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
export declare function getStudentAssessments(client: AxiosInstance, request: GetStudentAssessmentsRequest, config?: AxiosRequestConfig): Promise<GetStudentAssessmentsResponse>;
export declare const GET_STUDENT_ASSESSMENTS_QUERY_KEY: QueryKey;
export declare function useGetStudentAssessments(request: GetStudentAssessmentsRequest, options?: RequestConfigQueryOptions<GetStudentAssessmentsResponse>): import("react-query").UseQueryResult<GetStudentAssessmentsResponse, unknown>;
