"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var index_1 = require("./index");
/**
 * Parse log level from string to LOG_LEVEL enum value
 *
 * @param level Log level
 */
function parseLogLevel(level) {
    var _level = interfaces_1.LOG_LEVEL_NAME_MAP[level.toLocaleLowerCase()];
    if (_level !== undefined)
        return _level;
    else
        throw new Error("Unknown log level '" + level + "'");
}
exports.parseLogLevel = parseLogLevel;
/**
 * Logging decorator
 *
 * Assigns logger facility as `log` property.
 * Note: experimentalDecorators must be enabled
 *
 * @param constructor Class
 * @param facility Facility name
 * @param opts Facility options
 */
function Logging(facility, opts) {
    if (opts === void 0) { opts = {}; }
    return function (target) {
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, args) || this;
                var _facility = (facility || target.constructor ? target.constructor["name"] : "Class");
                _this.log = (opts.logger ? opts.logger : index_1.default).facility(_facility, opts);
                return _this;
            }
            return class_1;
        }(target));
    };
}
exports.Logging = Logging;
/**
 * Log method call decorator
 *
 * Traces method call
 *
 * @param level Log level
 * @param captureArgs If to capture arguments
 * @param prefix Log message prefix
 */
function LogMethodCall(level, captureArgs, prefix) {
    if (level === void 0) { level = index_1.LOG_LEVEL.DEBUG; }
    if (captureArgs === void 0) { captureArgs = true; }
    if (prefix === void 0) { prefix = ""; }
    return function (target, propertyKey, descriptor) {
        var _fn = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var stackTrace = index_1.default.captureStackTrace("");
            var meta = {
                class: target.constructor.name,
                method: propertyKey
            };
            var logger = this.log && this.log instanceof index_1.LoggerFacility ? this.log : index_1.default;
            var logArgs = [level, meta, prefix, "Method " + meta.class + "." + propertyKey + " called"];
            if (captureArgs) {
                logArgs.push("with arguments");
                logArgs.push(args);
            }
            logArgs.push("\n" + stackTrace);
            logger.log.apply(logger, logArgs);
            return _fn.apply(target, args);
        };
        return descriptor;
    };
}
exports.LogMethodCall = LogMethodCall;
//# sourceMappingURL=util.js.map