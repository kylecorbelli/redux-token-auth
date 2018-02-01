"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var RNAsyncStorage = {
    getItem: function (key) { return react_native_1.AsyncStorage.getItem(key); },
    setItem: function (key, value) {
        if (value == null) {
            return Promise.resolve();
        }
        return react_native_1.AsyncStorage.setItem(key, value);
    },
    removeItem: function (key) { return react_native_1.AsyncStorage.removeItem(key); },
    clear: function () { return react_native_1.AsyncStorage.clear(); },
    getAllKeys: function () { return react_native_1.AsyncStorage.getAllKeys(); },
    multiGet: function (keys) { return react_native_1.AsyncStorage.multiGet(keys); },
    multiSet: function (keyValuePairs) { return react_native_1.AsyncStorage.multiSet(keyValuePairs); },
};
exports.default = RNAsyncStorage;
//# sourceMappingURL=RNAsyncStorage.js.map