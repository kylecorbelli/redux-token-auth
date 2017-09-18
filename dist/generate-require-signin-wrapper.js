"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var generateRequireSignInWrapper = function (_a) {
    var redirectPathIfNotSignedIn = _a.redirectPathIfNotSignedIn;
    var requireSignInWrapper = function (PageComponent) {
        var GatedPage = /** @class */ (function (_super) {
            __extends(GatedPage, _super);
            function GatedPage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            GatedPage.prototype.componentWillMount = function () {
                var _a = this.props, history = _a.history, isSignedIn = _a.isSignedIn;
                if (!isSignedIn) {
                    history.replace(redirectPathIfNotSignedIn);
                }
            };
            GatedPage.prototype.render = function () {
                return React.createElement(PageComponent, __assign({}, this.props));
            };
            return GatedPage;
        }(React.Component));
        var mapStateToProps = function (state) { return ({
            isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn
        }); };
        return react_redux_1.connect(mapStateToProps)(GatedPage);
    };
    return requireSignInWrapper;
};
exports.default = generateRequireSignInWrapper;
//# sourceMappingURL=generate-require-signin-wrapper.js.map