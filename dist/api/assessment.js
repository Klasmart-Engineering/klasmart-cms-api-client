"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetStudentAssessments = exports.GET_STUDENT_ASSESSMENTS_QUERY_KEY = exports.getStudentAssessments = exports.useGetAssessmentsSummary = exports.GET_ASSESSMENTS_SUMMARY_QUERY_KEY = exports.getAssessmentsSummary = exports.useGetAssessments = exports.GET_ASSESSMENTS_QUERY_KEY = exports.getAssessments = void 0;
const core_1 = require("../core");
const react_query_1 = require("react-query");
function getAssessments(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client.get(`/v1/assessments`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign({}, request), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getAssessments = getAssessments;
exports.GET_ASSESSMENTS_QUERY_KEY = `getAssessments`;
function useGetAssessments(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_ASSESSMENTS_QUERY_KEY, request], () => getAssessments(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetAssessments = useGetAssessments;
function getAssessmentsSummary(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client.get(`/v1/assessments_summary`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign({}, request), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getAssessmentsSummary = getAssessmentsSummary;
exports.GET_ASSESSMENTS_SUMMARY_QUERY_KEY = `getAssessmentsSummary`;
function useGetAssessmentsSummary(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_ASSESSMENTS_SUMMARY_QUERY_KEY, request], () => getAssessmentsSummary(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetAssessmentsSummary = useGetAssessmentsSummary;
function getStudentAssessments(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield client.get(`/v1/assessments_for_student`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign({}, request), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getStudentAssessments = getStudentAssessments;
exports.GET_STUDENT_ASSESSMENTS_QUERY_KEY = `getStudentAssessments`;
function useGetStudentAssessments(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_STUDENT_ASSESSMENTS_QUERY_KEY, request], () => getStudentAssessments(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetStudentAssessments = useGetStudentAssessments;