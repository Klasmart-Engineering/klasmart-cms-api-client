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
exports.useGetScheduleById = exports.ScheduleClassType = void 0;
const core_1 = require("../core");
const react_query_1 = require("react-query");
var ScheduleClassType;
(function (ScheduleClassType) {
    ScheduleClassType["LIVE"] = "OnlineClass";
    ScheduleClassType["CLASSES"] = "OfflineClass";
    ScheduleClassType["STUDY"] = "Homework";
    ScheduleClassType["TASK"] = "Task";
})(ScheduleClassType = exports.ScheduleClassType || (exports.ScheduleClassType = {}));
function useGetScheduleById(request, options) {
    const { scheduleId } = request;
    return (0, react_query_1.useQuery)(`getScheduleByID=${scheduleId}`, () => __awaiter(this, void 0, void 0, function* () {
        const resp = yield core_1.client.get(`products/${scheduleId}`, options === null || options === void 0 ? void 0 : options.config);
        return resp.data;
    }), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetScheduleById = useGetScheduleById;
