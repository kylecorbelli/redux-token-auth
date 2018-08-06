"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var utility_1 = require("./utility");
var authHeaderKeys = [
    'access-token',
    'token-type',
    'client',
    'expiry',
    'uid',
];
// export const setAuthHeaders = (headers: AuthHeaders): void => {
//   authHeaderKeys.forEach((key: string) => {
//     axios.defaults.headers.common[key] = headers[key]
//   })
// }
//
// export const persistAuthHeadersInDeviceStorage = (Storage: DeviceStorage, headers: AuthHeaders): void => {
//   authHeaderKeys.forEach((key: string) => {
//     Storage.setItem(key, headers[key])
//   })
// }
exports.setAuthHeaders = function (Storage, headers) {
    authHeaderKeys.forEach(function (key) {
        Storage.getItem(key).then(function (fromStorage) {
            var value = headers[key] || fromStorage;
            axios_1.default.defaults.headers.common[key] = value;
        });
    });
};
exports.persistAuthHeadersInDeviceStorage = function (Storage, headers) {
    authHeaderKeys.forEach(function (key) {
        Storage.getItem(key).then(function (fromStorage) {
            var value = headers[key] || fromStorage;
            Storage.setItem(key, value); // <--- Not really needed
        });
    });
};
exports.deleteAuthHeaders = function () {
    authHeaderKeys.forEach(function (key) {
        delete axios_1.default.defaults.headers.common[key];
    });
};
exports.deleteAuthHeadersFromDeviceStorage = function (Storage) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        authHeaderKeys.forEach(function (key) {
            Storage.removeItem(key);
        });
        return [2 /*return*/];
    });
}); };
exports.getUserAttributesFromResponse = function (userAttributes, response) {
    var invertedUserAttributes = utility_1.invertMapKeysAndValues(userAttributes);
    var userAttributesBackendKeys = Object.keys(invertedUserAttributes);
    var userAttributesToReturn = {};
    Object.keys(response.data.data).forEach(function (key) {
        if (userAttributesBackendKeys.indexOf(key) !== -1) {
            userAttributesToReturn[invertedUserAttributes[key]] = response.data.data[key];
        }
    });
    return userAttributesToReturn;
};
//# sourceMappingURL=auth.js.map