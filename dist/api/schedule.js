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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostScheduleFeedback = exports.POST_SCHEDULE_FEEDBACK_MUTATION_KEY = exports.postScheduleFeedback = exports.usePostSchedulesTimeViewList = exports.GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY = exports.postSchedulesTimeViewList = exports.useGetLiveTokenByScheduleId = exports.GET_LIVE_TOKEN_BY_SCHEDULE_ID_QUERY_KEY = exports.getLiveTokenByScheduleId = exports.useGetScheduleById = exports.GET_SCHEDULE_BY_ID_QUERY_KEY = exports.getScheduleById = void 0;
const core_1 = require("../core");
const react_query_1 = require("react-query");
function getScheduleById(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { schedule_id } = request, rest = __rest(request, ["schedule_id"]);
        const resp = yield client.get(`/v1/schedules/${schedule_id}`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign({}, rest), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getScheduleById = getScheduleById;
exports.GET_SCHEDULE_BY_ID_QUERY_KEY = `getScheduleByID`;
function useGetScheduleById(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_SCHEDULE_BY_ID_QUERY_KEY, request], () => getScheduleById(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetScheduleById = useGetScheduleById;
function getLiveTokenByScheduleId(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { schedule_id } = request, rest = __rest(request, ["schedule_id"]);
        const resp = yield client.get(`/v1/schedules/${schedule_id}/live/token`, Object.assign(Object.assign({}, config), { params: Object.assign(Object.assign({}, rest), config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.getLiveTokenByScheduleId = getLiveTokenByScheduleId;
exports.GET_LIVE_TOKEN_BY_SCHEDULE_ID_QUERY_KEY = `getScheduleByID`;
function useGetLiveTokenByScheduleId(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_LIVE_TOKEN_BY_SCHEDULE_ID_QUERY_KEY, request], () => getLiveTokenByScheduleId(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetLiveTokenByScheduleId = useGetLiveTokenByScheduleId;
function postSchedulesTimeViewList(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { org_id } = request, rest = __rest(request, ["org_id"]);
        const resp = yield client.post(`/v1/schedules_time_view/list`, rest, Object.assign(Object.assign({}, config), { params: Object.assign({ org_id }, config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.postSchedulesTimeViewList = postSchedulesTimeViewList;
exports.GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY = `getScheduleTimeViewList`;
function usePostSchedulesTimeViewList(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([exports.GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY, request], () => postSchedulesTimeViewList(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.usePostSchedulesTimeViewList = usePostSchedulesTimeViewList;
function postScheduleFeedback(client, request, config) {
    return __awaiter(this, void 0, void 0, function* () {
        const { org_id } = request, rest = __rest(request, ["org_id"]);
        const resp = yield client.post(`/v1/schedules_feedbacks`, rest, Object.assign(Object.assign({}, config), { params: Object.assign({ org_id }, config === null || config === void 0 ? void 0 : config.params) }));
        return resp.data;
    });
}
exports.postScheduleFeedback = postScheduleFeedback;
exports.POST_SCHEDULE_FEEDBACK_MUTATION_KEY = `addScheduleFeedback`;
function usePostScheduleFeedback(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)([exports.POST_SCHEDULE_FEEDBACK_MUTATION_KEY, request], (request) => postScheduleFeedback(axiosClient, request, options === null || options === void 0 ? void 0 : options.config), Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.mutationOptions), { onSuccess: (data, variables, context) => {
            var _a, _b;
            queryClient.invalidateQueries(exports.GET_SCHEDULE_TIME_VIEW_LIST_QUERY_KEY);
            (_b = (_a = options === null || options === void 0 ? void 0 : options.mutationOptions) === null || _a === void 0 ? void 0 : _a.onSuccess) === null || _b === void 0 ? void 0 : _b.call(_a, data, variables, context);
        } }));
}
exports.usePostScheduleFeedback = usePostScheduleFeedback;
