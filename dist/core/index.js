"use strict";
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
exports.CmsApiClientProvider = exports.updateHttpConfig = exports.queryClient = exports.client = void 0;
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
const react_query_1 = require("react-query");
function updateHttpConfig(config) {
    exports.queryClient.cancelMutations();
    exports.queryClient.cancelQueries();
    exports.client.defaults = Object.assign(Object.assign({}, exports.client.defaults), config);
    exports.queryClient.clear();
}
exports.updateHttpConfig = updateHttpConfig;
function CmsApiClientProvider(props) {
    const { children, config, queryOptions, interceptors } = props, rest = __rest(props, ["children", "config", "queryOptions", "interceptors"]);
    if (!exports.queryClient)
        exports.queryClient = new react_query_1.QueryClient(queryOptions);
    if (!exports.client)
        exports.client = axios_1.default.create(config);
    for (const interceptor of interceptors !== null && interceptors !== void 0 ? interceptors : []) {
        exports.client.interceptors.response.use(interceptor.onFulfilled, interceptor.onRejected);
    }
    const updatedProps = Object.assign({ client: exports.queryClient }, rest);
    return (react_1.default.createElement(react_query_1.QueryClientProvider, Object.assign({}, updatedProps), children));
}
exports.CmsApiClientProvider = CmsApiClientProvider;
