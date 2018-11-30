"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var async_storage_1 = require("@callstack/async-storage");
var AsyncLocalStorage = {
    getItem: function (key) { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                var value = window.localStorage.getItem(key);
                resolve(value);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.getItem(key).then(function (value) {
                resolve(value);
            }, reject);
        }
    }); },
    setItem: function (key, value) { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                window.localStorage.setItem(key, value);
                resolve(value);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.setItem(key, value).then(function () {
                resolve(value);
            }, reject);
        }
    }); },
    removeItem: function (key) { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                var value = window.localStorage.getItem(key);
                window.localStorage.removeItem(key);
                resolve(value);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.removeItem(key).then(function () {
                resolve();
            }, reject);
        }
    }); },
    clear: function () { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                window.localStorage.clear();
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.clear().then(function () {
                resolve(true);
            }, reject);
        }
    }); },
    getAllKeys: function () { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                var allKeys = Object.keys(window.localStorage);
                resolve(allKeys);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.getAllKeys().then(function (allKeys) {
                resolve(allKeys);
            }, reject);
        }
    }); },
    multiGet: function (keys) { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                var values = keys.map(function (key) { return [key, window.localStorage.getItem(key)]; });
                resolve(values);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.multiGet(keys).then(function (values) {
                resolve(values);
            }, reject);
        }
    }); },
    multiSet: function (keyValuePairs) { return new Promise(function (resolve, reject) {
        if (window.localStorage) {
            try {
                keyValuePairs.forEach(function (keyValuePair) { return window.localStorage.setItem(keyValuePair[0], keyValuePair[1]); });
                var newKeyValuePairs = keyValuePairs.map(function (keyValuePair) { return [keyValuePair[0], window.localStorage.getItem(keyValuePair[0])]; });
                resolve(newKeyValuePairs);
            }
            catch (error) {
                reject(error);
            }
        }
        else {
            async_storage_1.default.multiSet(keyValuePairs).then(function () {
                resolve();
            }, reject);
        }
    }); },
};
exports.default = AsyncLocalStorage;
//# sourceMappingURL=AsyncLocalStorage.js.map