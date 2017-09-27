"use strict";
// import { AsyncStorage } from 'react-native'
Object.defineProperty(exports, "__esModule", { value: true });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Rip this out into its own npm package:
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AsyncLocalStorage = {
    getItem: function (key) { return new Promise(function (resolve, reject) {
        try {
            var value = window.localStorage.getItem(key);
            resolve(value);
        }
        catch (error) {
            reject(error);
        }
    }); },
    setItem: function (key, value) { return new Promise(function (resolve, reject) {
        try {
            window.localStorage.setItem(key, value);
            resolve(value);
        }
        catch (error) {
            reject(error);
        }
    }); },
    removeItem: function (key) { return new Promise(function (resolve, reject) {
        try {
            var value = window.localStorage.getItem(key);
            window.localStorage.removeItem(key);
            resolve(value);
        }
        catch (error) {
            reject(error);
        }
    }); },
    clear: function () { return new Promise(function (resolve, reject) {
        try {
            window.localStorage.clear();
            resolve(true);
        }
        catch (error) {
            reject(error);
        }
    }); },
    getAllKeys: function () { return new Promise(function (resolve, reject) {
        try {
            var allKeys = Object.keys(window.localStorage);
            resolve(allKeys);
        }
        catch (error) {
            reject(error);
        }
    }); },
    multiGet: function (keys) { return new Promise(function (resolve, reject) {
        try {
            var values = keys.map(function (key) { return [key, window.localStorage.getItem(key)]; });
            resolve(values);
        }
        catch (error) {
            reject(error);
        }
    }); },
    multiSet: function (keyValuePairs) { return new Promise(function (resolve, reject) {
        try {
            keyValuePairs.forEach(function (keyValuePair) { return window.localStorage.setItem(keyValuePair[0], keyValuePair[1]); });
            var newKeyValuePairs = keyValuePairs.map(function (keyValuePair) { return [keyValuePair[0], window.localStorage.getItem(keyValuePair[0])]; });
            resolve(newKeyValuePairs);
        }
        catch (error) {
            reject(error);
        }
    }); },
};
exports.default = AsyncLocalStorage;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ^ Rip this out into its own npm package
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//# sourceMappingURL=AsyncLocalStorage.js.map