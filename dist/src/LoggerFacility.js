"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
/**
 * Facility class
 */
var LoggerFacility = /** @class */ (function () {
    /**
     * Facility constructor
     *
     * @param logger Logger instance
     * @param prefix Facility name
     * @param config Facility configuration
     */
    function LoggerFacility(logger, prefix, config) {
        if (config === void 0) { config = {}; }
        this.logger = logger;
        this.prefix = prefix;
        this.level = config.level || interfaces_1.LOG_LEVEL.DEBUG;
    }
    /**
     * Sets log level
     *
     * @param level New log level
     */
    LoggerFacility.prototype.setLevel = function (level) {
        this.level = level;
    };
    /**
     * Returns log level
     */
    LoggerFacility.prototype.getLevel = function () {
        return this.level;
    };
    /**
     * Internal log method that pass log message to parent logger - DO NOT USE DIRECTLY!
     *
     * @internal
     * @param level Log level
     * @param args Message arguments
     */
    LoggerFacility.prototype._log = function (level, args) {
        if (level > this.level)
            return;
        this.logger._log(level, this.prefix, args);
    };
    /**
     * Logs message - first argument MUST be log level (from enum = number)
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.log(LOG_LEVEL.INFO, "Formatted %s message, code %d", "info", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = Array.prototype.slice.call(args);
        var level = params.shift();
        this._log(level, params);
    };
    /**
     * Log DEBUG level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.debug("Formatted %s message, code %d", "debug", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.DEBUG, Array.prototype.slice.call(args));
    };
    /**
     * Log INFO level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.info("Formatted %s message, code %d", "info", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.INFO, Array.prototype.slice.call(args));
    };
    /**
     * Log NOTICE level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.notice("Formatted %s message, code %d", "notice", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.notice = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.NOTICE, Array.prototype.slice.call(args));
    };
    /**
     * Log WARN level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.warn("Formatted %s message, code %d", "warn", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.WARN, Array.prototype.slice.call(args));
    };
    /**
     * Log WARN level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.warn("Formatted %s message, code %d", "warn", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.WARN, Array.prototype.slice.call(args));
    };
    /**
     * Log ERROR level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.error("Formatted %s message, code %d", "error", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.ERROR, Array.prototype.slice.call(args));
    };
    /**
     * Log CRITICAL level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.crit("Formatted %s message, code %d", "critical", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.crit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.CRITICAL, Array.prototype.slice.call(args));
    };
    /**
     * Log ALERT level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.alert("Formatted %s message, code %d", "alert", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.alert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.ALERT, Array.prototype.slice.call(args));
    };
    /**
     * Log EMERGENCY level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.emerg("Formatted %s message, code %d", "emergency", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.emerg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.EMERGENCY, Array.prototype.slice.call(args));
    };
    /**
     * Log EMERGENCY level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.panic("Formatted %s message, code %d", "emergency panic", 123);
     * ```
     *
     * @param args Message arguments
     */
    LoggerFacility.prototype.panic = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.EMERGENCY, Array.prototype.slice.call(args));
    };
    return LoggerFacility;
}());
exports.LoggerFacility = LoggerFacility;
//# sourceMappingURL=LoggerFacility.js.map