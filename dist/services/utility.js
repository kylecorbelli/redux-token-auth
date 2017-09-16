"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invertMapKeysAndValues = function (stringMap) {
    var newStringMap = {};
    for (var key in stringMap) {
        var val = stringMap[key];
        newStringMap[val] = key;
    }
    return newStringMap;
};
//# sourceMappingURL=utility.js.map