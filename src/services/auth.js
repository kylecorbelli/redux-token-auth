"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var authHeaderKeys = [
    'access-token',
    'token-type',
    'client',
    'expiry',
    'uid',
];
exports.setAuthHeaders = function (headers) {
    authHeaderKeys.forEach(function (key) {
        axios_1["default"].defaults.headers.common[key] = headers[key];
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
        delete axios_1["default"].defaults.headers.common[key];
    });
};
// Will have to take a parameter from the package user to determine if this is for a browser or for React Native:
exports.deleteAuthHeadersFromLocalStorage = function () {
    authHeaderKeys.forEach(function (key) {
        localStorage.removeItem(key);
    });
};
