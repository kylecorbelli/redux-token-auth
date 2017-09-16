"use strict";
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
exports.setAuthHeaders = function (headers) {
    authHeaderKeys.forEach(function (key) {
        axios_1.default.defaults.headers.common[key] = headers[key];
    });
};
// Will have to take a parameter from the package user to determine if this is for a browser or for React Native:
exports.persistAuthHeadersInLocalStorage = function (headers) {
    authHeaderKeys.forEach(function (key) {
        localStorage.setItem(key, headers[key]);
    });
};
exports.deleteAuthHeaders = function () {
    authHeaderKeys.forEach(function (key) {
        delete axios_1.default.defaults.headers.common[key];
    });
};
// Will have to take a parameter from the package user to determine if this is for a browser or for React Native:
exports.deleteAuthHeadersFromLocalStorage = function () {
    authHeaderKeys.forEach(function (key) {
        localStorage.removeItem(key);
    });
};
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