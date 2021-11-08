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
exports.usePostSchedulesTimeViewList = exports.postSchedulesTimeViewList = exports.useGetLiveTokenByScheduleId = exports.getLiveTokenByScheduleId = exports.useGetScheduleById = exports.getScheduleById = exports.ScheduleLiveTokenType = exports.ScheduleClassType = void 0;
const core_1 = require("../core");
const react_query_1 = require("react-query");
var ScheduleClassType;
(function (ScheduleClassType) {
    ScheduleClassType["LIVE"] = "OnlineClass";
    ScheduleClassType["CLASSES"] = "OfflineClass";
    ScheduleClassType["STUDY"] = "Homework";
    ScheduleClassType["TASK"] = "Task";
})(ScheduleClassType = exports.ScheduleClassType || (exports.ScheduleClassType = {}));
var ScheduleLiveTokenType;
(function (ScheduleLiveTokenType) {
    ScheduleLiveTokenType["LIVE"] = "live";
    ScheduleLiveTokenType["PREVIEW"] = "preview";
})(ScheduleLiveTokenType = exports.ScheduleLiveTokenType || (exports.ScheduleLiveTokenType = {}));
function getScheduleById(request, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { scheduleId } = request;
        const resp = yield core_1.client.get(`/v1/schedules/${scheduleId}`, Object.assign({ params: {
                schedule_id: request.scheduleId,
                live_token_type: request.liveTokenType,
            } }, options === null || options === void 0 ? void 0 : options.config));
        return resp.data;
    });
}
exports.getScheduleById = getScheduleById;
function useGetScheduleById(request, options) {
    const { scheduleId } = request;
    return (0, react_query_1.useQuery)(`getScheduleByID=${scheduleId}`, () => getScheduleById(request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetScheduleById = useGetScheduleById;
function getLiveTokenByScheduleId(request, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { scheduleId } = request;
        const resp = yield core_1.client.get(`/v1/schedules/${scheduleId}/live/token`, Object.assign({ params: {
                schedule_id: request.scheduleId,
                live_token_type: request.liveTokenType,
            } }, options === null || options === void 0 ? void 0 : options.config));
        return resp.data;
    });
}
exports.getLiveTokenByScheduleId = getLiveTokenByScheduleId;
function useGetLiveTokenByScheduleId(request, options) {
    const { scheduleId, liveTokenType } = request;
    return (0, react_query_1.useQuery)(`getScheduleByID=${scheduleId},${liveTokenType}`, () => getLiveTokenByScheduleId(request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetLiveTokenByScheduleId = useGetLiveTokenByScheduleId;
function postSchedulesTimeViewList(request, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const resp = yield core_1.client.post(`/v1/schedules_time_view/list`, request, options === null || options === void 0 ? void 0 : options.config);
        return resp.data;
    });
}
exports.postSchedulesTimeViewList = postSchedulesTimeViewList;
function usePostSchedulesTimeViewList(request, options) {
    return (0, react_query_1.useQuery)(`getScheduleTimeViewList`, () => postSchedulesTimeViewList(request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.usePostSchedulesTimeViewList = usePostSchedulesTimeViewList;
