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
exports.usePostSchedulesTimeViewList = exports.postSchedulesTimeViewList = exports.useGetLiveTokenByScheduleId = exports.getLiveTokenByScheduleId = exports.useGetScheduleById = exports.getScheduleById = void 0;
const core_1 = require("../core");
const react_query_1 = require("react-query");
function getScheduleById(client, request, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { schedule_id } = request, rest = __rest(request, ["schedule_id"]);
        const resp = yield client.get(`/v1/schedules/${schedule_id}`, Object.assign({ params: Object.assign(Object.assign({}, rest), (_a = options === null || options === void 0 ? void 0 : options.config) === null || _a === void 0 ? void 0 : _a.params) }, options === null || options === void 0 ? void 0 : options.config));
        return resp.data;
    });
}
exports.getScheduleById = getScheduleById;
function useGetScheduleById(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([`getScheduleByID`, request], () => getScheduleById(axiosClient, request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetScheduleById = useGetScheduleById;
function getLiveTokenByScheduleId(client, request, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { schedule_id } = request, rest = __rest(request, ["schedule_id"]);
        const resp = yield client.get(`/v1/schedules/${schedule_id}/live/token`, Object.assign({ params: Object.assign(Object.assign({}, rest), (_a = options === null || options === void 0 ? void 0 : options.config) === null || _a === void 0 ? void 0 : _a.params) }, options === null || options === void 0 ? void 0 : options.config));
        return resp.data;
    });
}
exports.getLiveTokenByScheduleId = getLiveTokenByScheduleId;
function useGetLiveTokenByScheduleId(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([`getScheduleByID`, request], () => getLiveTokenByScheduleId(axiosClient, request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetLiveTokenByScheduleId = useGetLiveTokenByScheduleId;
function postSchedulesTimeViewList(client, request, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { org_id } = request, rest = __rest(request, ["org_id"]);
        const resp = yield client.post(`/v1/schedules_time_view/list`, rest, Object.assign({ params: Object.assign({ org_id }, (_a = options === null || options === void 0 ? void 0 : options.config) === null || _a === void 0 ? void 0 : _a.params) }, options === null || options === void 0 ? void 0 : options.config));
        return resp.data;
    });
}
exports.postSchedulesTimeViewList = postSchedulesTimeViewList;
function usePostSchedulesTimeViewList(request, options) {
    const { axiosClient } = (0, core_1.useCmsApiClient)();
    return (0, react_query_1.useQuery)([`getScheduleTimeViewList`, request], () => postSchedulesTimeViewList(axiosClient, request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.usePostSchedulesTimeViewList = usePostSchedulesTimeViewList;
