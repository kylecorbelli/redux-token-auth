"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
            GatedPage.prototype.componentWillReceiveProps = function (nextProps) {
                var history = nextProps.history, hasVerificationBeenAttempted = nextProps.hasVerificationBeenAttempted, isSignedIn = nextProps.isSignedIn;
                if (hasVerificationBeenAttempted && !isSignedIn) {
                    history.replace(redirectPathIfNotSignedIn);
                }
            };
            GatedPage.prototype.render = function () {
                var _a = this.props, hasVerificationBeenAttempted = _a.hasVerificationBeenAttempted, isSignedIn = _a.isSignedIn;
                return (hasVerificationBeenAttempted && isSignedIn) ?
                    React.createElement(PageComponent, __assign({}, this.props))
                    :
                        React.createElement("div", null);
            };
            return GatedPage;
        }(React.Component));
        var mapStateToProps = function (state) { return ({
            hasVerificationBeenAttempted: state.reduxTokenAuth.currentUser.hasVerificationBeenAttempted,
            isSignedIn: state.reduxTokenAuth.currentUser.isSignedIn
        }); };
        return react_redux_1.connect(mapStateToProps)(GatedPage);
    };
    return requireSignInWrapper;
};
exports.default = generateRequireSignInWrapper;
//# sourceMappingURL=generate-require-signin-wrapper.js.map