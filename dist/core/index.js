"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCmsApiClient = exports.CmsApiClientProvider = void 0;
const assessment_1 = require("../api/assessment");
const content_1 = require("../api/content");
const schedule_1 = require("../api/schedule");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importStar(require("react"));
const react_query_1 = require("react-query");
class CmsApiClientNoProviderError extends Error {
    constructor() {
        super(`useCmsApiClient must be used within a CmsApiClientContext.Provider`);
        this.name = `NO_PROVIDER`;
    }
}
const CmsApiClientContext = (0, react_1.createContext)({
    queryClient: null,
    axiosClient: null,
    updateHttpConfig: () => { throw new CmsApiClientNoProviderError(); },
    actions: {
        getScheduleById: () => { throw new CmsApiClientNoProviderError(); },
        getLiveTokenByScheduleId: () => { throw new CmsApiClientNoProviderError(); },
        postSchedulesTimeViewList: () => { throw new CmsApiClientNoProviderError(); },
        postAddScheduleFeedback: () => { throw new CmsApiClientNoProviderError(); },
        getScheduleNewestFeedbackById: () => { throw new CmsApiClientNoProviderError(); },
        getContentResourcePathById: () => { throw new CmsApiClientNoProviderError(); },
        getStudentAssessments: () => { throw new CmsApiClientNoProviderError(); },
        getAssessmentsSummary: () => { throw new CmsApiClientNoProviderError(); },
        getAssessments: () => { throw new CmsApiClientNoProviderError(); },
    },
});
function CmsApiClientProvider(props) {
    const { children, config, queryOptions, responseInterceptors, requestInterceptors } = props, rest = __rest(props, ["children", "config", "queryOptions", "responseInterceptors", "requestInterceptors"]);
    const queryClient = (0, react_1.useMemo)(() => new react_query_1.QueryClient(queryOptions), [queryOptions]);
    const axiosClient = (0, react_1.useMemo)(() => {
        const client = axios_1.default.create(config);
        for (const interceptor of requestInterceptors !== null && requestInterceptors !== void 0 ? requestInterceptors : []) {
            client.interceptors.request.use(interceptor.onFulfilled, interceptor.onRejected);
        }
        for (const interceptor of responseInterceptors !== null && responseInterceptors !== void 0 ? responseInterceptors : []) {
            client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
        }
        return client;
    }, [
        config,
        responseInterceptors,
        requestInterceptors,
    ]);
    const updateHttpConfig = (0, react_1.useCallback)((config) => {
        queryClient.cancelMutations();
        queryClient.cancelQueries();
        axiosClient.defaults = Object.assign(Object.assign({}, axiosClient.defaults), config);
        queryClient.clear();
    }, [axiosClient, queryClient]);
    const updatedProps = Object.assign({ client: queryClient }, rest);
    const getScheduleByIdAction = (0, react_1.useCallback)((request, options) => {
        return (0, schedule_1.getScheduleById)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const getLiveTokenByScheduleIdAction = (0, react_1.useCallback)((request, options) => {
        return (0, schedule_1.getLiveTokenByScheduleId)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const postSchedulesTimeViewListAction = (0, react_1.useCallback)((request, options) => {
        return (0, schedule_1.postSchedulesTimeViewList)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const postAddScheduleFeedbackAction = (0, react_1.useCallback)((request, options) => {
        return (0, schedule_1.postScheduleFeedback)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const getScheduleNewestFeedbackByIdAction = (0, react_1.useCallback)((request, options) => {
        return (0, schedule_1.getScheduleNewestFeedbackById)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const getContentResourcePathByIdAction = (0, react_1.useCallback)((request, options) => {
        return (0, content_1.getContentResourcePathById)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const getStudentAssessmentsAction = (0, react_1.useCallback)((request, options) => {
        return (0, assessment_1.getStudentAssessments)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const getAssessmentsSummaryAction = (0, react_1.useCallback)((request, options) => {
        return (0, assessment_1.getAssessmentsSummary)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const getAssessmentsAction = (0, react_1.useCallback)((request, options) => {
        return (0, assessment_1.getAssessments)(axiosClient, request, options === null || options === void 0 ? void 0 : options.config);
    }, [axiosClient]);
    const actions = (0, react_1.useMemo)(() => {
        return {
            getScheduleById: getScheduleByIdAction,
            getLiveTokenByScheduleId: getLiveTokenByScheduleIdAction,
            postSchedulesTimeViewList: postSchedulesTimeViewListAction,
            postAddScheduleFeedback: postAddScheduleFeedbackAction,
            getScheduleNewestFeedbackById: getScheduleNewestFeedbackByIdAction,
            getContentResourcePathById: getContentResourcePathByIdAction,
            getStudentAssessments: getStudentAssessmentsAction,
            getAssessmentsSummary: getAssessmentsSummaryAction,
            getAssessments: getAssessmentsAction,
        };
    }, [
        getScheduleByIdAction,
        getLiveTokenByScheduleIdAction,
        postSchedulesTimeViewListAction,
        postAddScheduleFeedbackAction,
        getScheduleNewestFeedbackByIdAction,
        getContentResourcePathByIdAction,
        getStudentAssessmentsAction,
        getAssessmentsSummaryAction,
        getAssessmentsAction,
    ]);
    return (react_1.default.createElement(CmsApiClientContext.Provider, { value: {
            queryClient,
            axiosClient,
            updateHttpConfig,
            actions,
        } },
        react_1.default.createElement(react_query_1.QueryClientProvider, Object.assign({}, updatedProps), children)));
}
exports.CmsApiClientProvider = CmsApiClientProvider;
const useCmsApiClient = () => {
    const context = (0, react_1.useContext)(CmsApiClientContext);
    if (!context) {
        throw new CmsApiClientNoProviderError();
    }
    return context;
};
exports.useCmsApiClient = useCmsApiClient;
