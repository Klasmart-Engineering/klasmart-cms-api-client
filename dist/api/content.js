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
exports.useGetContentResourcePathById = exports.getContentResourcePathById = void 0;
const core_1 = require("../core");
const react_query_1 = require("react-query");
function getContentResourcePathById(request, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const { resource_id } = request;
        const resp = yield core_1.client.get(`/v1/contents_resources/${resource_id}`, Object.assign({ responseType: `blob` }, options === null || options === void 0 ? void 0 : options.config));
        return resp.data;
    });
}
exports.getContentResourcePathById = getContentResourcePathById;
function useGetContentResourcePathById(request, options) {
    return (0, react_query_1.useMutation)([`getDownloadPath`, request], () => getContentResourcePathById(request, options), options === null || options === void 0 ? void 0 : options.queryOptions);
}
exports.useGetContentResourcePathById = useGetContentResourcePathById;
