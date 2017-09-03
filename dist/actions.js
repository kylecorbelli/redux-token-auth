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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var types_1 = require("./types");
var auth_1 = require("./services/auth"); // <- maybe this is where you pass in the platform paramter, specifying if it is for a browser or for React Native
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pure Redux actions:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.registrationRequestSent = function () { return ({
    type: types_1.REGISTRATION_REQUEST_SENT,
}); };
exports.registrationRequestSucceeded = function (userAttributes) { return ({
    type: types_1.REGISTRATION_REQUEST_SUCCEEDED,
    payload: {
        userAttributes: userAttributes,
    },
}); };
exports.registrationRequestFailed = function () { return ({
    type: types_1.REGISTRATION_REQUEST_FAILED,
}); };
exports.verifyTokenRequestSent = function () { return ({
    type: types_1.VERIFY_TOKEN_REQUEST_SENT,
}); };
exports.verifyTokenRequestSucceeded = function (userAttributes) { return ({
    type: types_1.VERIFY_TOKEN_REQUEST_SUCCEEDED,
    payload: {
        userAttributes: userAttributes,
    },
}); };
exports.verifyTokenRequestFailed = function () { return ({
    type: types_1.VERIFY_TOKEN_REQUEST_FAILED,
}); };
exports.signInRequestSent = function () { return ({
    type: types_1.SIGNIN_REQUEST_SENT,
}); };
exports.signInRequestSucceeded = function (userAttributes) { return ({
    type: types_1.SIGNIN_REQUEST_SUCCEEDED,
    payload: {
        userAttributes: userAttributes,
    },
}); };
exports.signInRequestFailed = function () { return ({
    type: types_1.SIGNIN_REQUEST_FAILED,
}); };
exports.signOutRequestSent = function () { return ({
    type: types_1.SIGNOUT_REQUEST_SENT,
}); };
exports.signOutRequestSucceeded = function () { return ({
    type: types_1.SIGNOUT_REQUEST_SUCCEEDED,
}); };
exports.signOutRequestFailed = function () { return ({
    type: types_1.SIGNOUT_REQUEST_FAILED,
}); };
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Async Redux Thunk actions:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var generateAuthActions = function (authUrl) {
    var registerUser = function (userRegistrationDetails) { return function (dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, email, password, passwordConfirmation, response, userAttributes, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch(exports.registrationRequestSent());
                        firstName = userRegistrationDetails.firstName, email = userRegistrationDetails.email, password = userRegistrationDetails.password, passwordConfirmation = userRegistrationDetails.passwordConfirmation;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: authUrl,
                                data: {
                                    email: email,
                                    name: firstName,
                                    password: password,
                                    password_confirmation: passwordConfirmation,
                                },
                            })];
                    case 2:
                        response = _a.sent();
                        auth_1.setAuthHeaders(response.headers);
                        auth_1.persistAuthHeadersInLocalStorage(response.headers);
                        userAttributes = {
                            firstName: firstName,
                        };
                        dispatch(exports.registrationRequestSucceeded(userAttributes));
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        dispatch(exports.registrationRequestFailed());
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; };
    var verifyToken = function (verificationParams) { return function (dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var response, name_1, userAttributes, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch(exports.verifyTokenRequestSent());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default({
                                method: 'GET',
                                url: authUrl + "/validate_token",
                                params: verificationParams,
                            })];
                    case 2:
                        response = _a.sent();
                        name_1 = response.data.data.name;
                        auth_1.setAuthHeaders(response.headers);
                        auth_1.persistAuthHeadersInLocalStorage(response.headers);
                        userAttributes = {
                            firstName: name_1,
                        };
                        dispatch(exports.verifyTokenRequestSucceeded(userAttributes));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        dispatch(exports.verifyTokenRequestFailed());
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; };
    var signInUser = function (userSignInCredentials) { return function (dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, response, name_2, userAttributes, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch(exports.signInRequestSent());
                        email = userSignInCredentials.email, password = userSignInCredentials.password;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default({
                                method: 'POST',
                                url: authUrl + "/sign_in",
                                data: {
                                    email: email,
                                    password: password,
                                },
                            })];
                    case 2:
                        response = _a.sent();
                        auth_1.setAuthHeaders(response.headers);
                        auth_1.persistAuthHeadersInLocalStorage(response.headers);
                        name_2 = response.data.data.name;
                        userAttributes = {
                            firstName: name_2,
                        };
                        dispatch(exports.signInRequestSucceeded(userAttributes));
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        dispatch(exports.signInRequestFailed());
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; };
    var signOutUser = function (userSignOutCredentials) { return function (dispatch) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dispatch(exports.signOutRequestSent());
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default({
                                method: 'DELETE',
                                url: authUrl + "/sign_out",
                                data: userSignOutCredentials,
                            })];
                    case 2:
                        _a.sent();
                        auth_1.deleteAuthHeaders();
                        auth_1.deleteAuthHeadersFromLocalStorage();
                        dispatch(exports.signOutRequestSucceeded());
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        dispatch(exports.signOutRequestFailed());
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; };
    return {
        registerUser: registerUser,
        verifyToken: verifyToken,
        signInUser: signInUser,
        signOutUser: signOutUser,
    };
};
exports.default = generateAuthActions;
//# sourceMappingURL=actions.js.map