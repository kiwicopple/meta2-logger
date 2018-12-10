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
var LoggerFacility_1 = require("./LoggerFacility");
var ConsoleTarget_1 = require("./ConsoleTarget");
var MemoryTarget_1 = require("./MemoryTarget");
var FileTarget_1 = require("./FileTarget");
var JsonFileTarget_1 = require("./JsonFileTarget");
var GraylogTarget_1 = require("./GraylogTarget");
/**
 * Logger class
 */
var Logger = /** @class */ (function () {
    /**
     * Logger constructor
     *
     * @param config Logger configuration
     */
    function Logger(config) {
        if (config === void 0) { config = {}; }
        /** Logging targets */
        this.targets = {};
        /** Facility registry */
        this.facilities = {};
        this.level = config.level || interfaces_1.LOG_LEVEL.DEBUG;
        this.trace = config.trace || false;
    }
    /**
     * Sets log level
     *
     * @param level New log level
     */
    Logger.prototype.setLevel = function (level) {
        this.level = level;
    };
    /**
     * Returns log level
     */
    Logger.prototype.getLevel = function () {
        return this.level;
    };
    /**
     * Enabled or disabled storing of callstacks
     *
     * @param enabled Enable state
     */
    Logger.prototype.enableTrace = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        this.trace = enabled;
    };
    /**
     * Return is tracing is enabled
     */
    Logger.prototype.isTraceEnabled = function () {
        return this.trace;
    };
    /**
     * Capture, filter and return log message stack trace
     */
    Logger.prototype.captureStackTrace = function (prefix) {
        if (prefix === void 0) { prefix = ">>\n"; }
        var traceObj = { stack: null };
        Error.captureStackTrace(traceObj);
        var lines = traceObj.stack.split("\n");
        var out = [];
        for (var i = 1; i < lines.length; i++)
            if (!lines[i].match(/Logger(Facility)?\.(_log|captureStackTrace)/))
                return prefix + out.concat(lines.splice(i)).join("\n");
        return traceObj.stack;
    };
    /**
     * Internal log method that pass log message to all targets - DO NOT USE DIRECTLY!
     *
     * @internal
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     */
    Logger.prototype._log = function (level, facility, args) {
        if (facility === null && level > this.level)
            return;
        var meta = {};
        if (args[0] instanceof Object)
            meta = args.shift();
        if (this.trace)
            meta["trace"] = this.captureStackTrace();
        for (var i in this.targets)
            this.targets[i].log.call(this.targets[i], level, facility, args, meta);
    };
    /**
     * Logs message - first argument MUST be log level (from enum = number)
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.log(LOG_LEVEL.INFO, "Formatted %s message, code %d", "info", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var params = Array.prototype.slice.call(args);
        var level = params.shift();
        this._log(level, null, params);
    };
    /**
     * Log DEBUG level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.debug("Formatted %s message, code %d", "debug", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.DEBUG, null, Array.prototype.slice.call(args));
    };
    /**
     * Log INFO level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.info("Formatted %s message, code %d", "info", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.INFO, null, Array.prototype.slice.call(args));
    };
    /**
     * Log NOTICE level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.notice("Formatted %s message, code %d", "notice", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.notice = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.NOTICE, null, Array.prototype.slice.call(args));
    };
    /**
     * Log WARN level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.warn("Formatted %s message, code %d", "warn", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.WARN, null, Array.prototype.slice.call(args));
    };
    /**
     * Log WARN level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.warning("Formatted %s message, code %d", "warn", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.warning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.WARN, null, Array.prototype.slice.call(args));
    };
    /**
     * Log ERROR level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.error("Formatted %s message, code %d", "error", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.ERROR, null, Array.prototype.slice.call(args));
    };
    /**
     * Log CRITICAL level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.crit("Formatted %s message, code %d", "critical", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.crit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.CRITICAL, null, Array.prototype.slice.call(args));
    };
    /**
     * Log ALERT level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.alert("Formatted %s message, code %d", "alert", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.alert = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.ALERT, null, Array.prototype.slice.call(args));
    };
    /**
     * Log EMERGENCY level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.emerg("Formatted %s message, code %d", "emergency", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.emerg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.EMERGENCY, null, Array.prototype.slice.call(args));
    };
    /**
     * Log EMERGENCY level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.panic("Formatted %s message, code %d", "emergency panic", 123);
     * ```
     *
     * @param args Message arguments
     */
    Logger.prototype.panic = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._log(interfaces_1.LOG_LEVEL.EMERGENCY, null, Array.prototype.slice.call(args));
    };
    /**
     * Create facility logger wrapper
     *
     * @param name Facility name
     * @param config Facility configuration
     */
    Logger.prototype.facility = function (name, config) {
        if (config === void 0) { config = {}; }
        if (this.facilities[name])
            return this.facilities[name];
        return this.facilities[name] = new LoggerFacility_1.LoggerFacility(this, name, config);
    };
    /**
     * Return registered facilities
     */
    Logger.prototype.getAllFacilities = function () {
        return this.facilities;
    };
    /**
     * Add logging target
     *
     * @param id Target unique ID
     * @param target Target instance
     */
    Logger.prototype.to = function (id, target) {
        this.targets[id] = target;
        return this;
    };
    /**
     * Return all assigned logging targets
     */
    Logger.prototype.getAllTargets = function () {
        return this.targets;
    };
    /**
     * Return target by ID
     *
     * @param id Logging target ID
     */
    Logger.prototype.getTarget = function (id) {
        return this.targets[id];
    };
    /**
     * Add console target
     *
     * Overrides existings console target defined previously by this method.
     *
     * Usage:
     *
     * ```
     * logger.toConsole({
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * 	colorize: true
     * });
     * ```
     *
     * @param options Target options
     */
    Logger.prototype.toConsole = function (options) {
        if (options === void 0) { options = {}; }
        this.targets["__console__"] = new ConsoleTarget_1.ConsoleTarget(options);
        return this;
    };
    /**
     * Add memory target
     *
     * Overrides existings memory target defined previously by this method.
     *
     * Usage:
     *
     * ```
     * logger.toMemory({
     * 	level: LOG_LEVEL.DEBUG,
     * 	limit: 1000
     * });
     *
     * logger.getTarget("__memory__").getMessages();
     * ```
     *
     * @param options Target options
     */
    Logger.prototype.toMemory = function (options) {
        if (options === void 0) { options = {}; }
        this.targets["__memory__"] = new MemoryTarget_1.MemoryTarget(options);
        return this;
    };
    /**
     * Add file target
     *
     * Usage:
     *
     * ```
     * logger.toFile("myLogFile.log", {
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * });
     * ```
     *
     * @param filename Log filename
     * @param options Target options
     */
    Logger.prototype.toFile = function (filename, options) {
        if (options === void 0) { options = {}; }
        this.targets[filename] = new FileTarget_1.FileTarget(filename, options);
        return this;
    };
    /**
     * Add JSON file target
     *
     * Usage:
     *
     * ```
     * logger.toJsonFile("myLogFile.json", {
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * });
     * ```
     *
     * @param filename Log filename
     * @param options Target options
     */
    Logger.prototype.toJsonFile = function (filename, options) {
        if (options === void 0) { options = {}; }
        this.targets[filename] = new JsonFileTarget_1.JsonFileTarget(filename, options);
        return this;
    };
    /**
     * Add GrayLog (GELF) target
     *
     * Overrides existings grayLog target defined previously by this method. Use `logger.to()` method to define
     * multiple GrayLog targets.
     *
     * Usage:
     *
     * ```
     * logger.toGrayLog({
     * 	level: LOG_LEVEL.DEBUG,
     * 	facilities: [ "server", "broker" ],
     * 	graylogHostname: "localhost",
     * 	graylogPort: 12201,
     * 	connection: "lan",
     * 	maxChunkSizeWan: 1420,
     * 	maxChunkSizeLan: 8154,
     * 	host: "myApp",
     * 	facilityPrefix: "myAppPrefix_",
     * 	version: "1.0",
     * 	additionalFields: {
     * 		myField: "myValue"
     * 	},
     * 	debugGelfClient: true
     * });
     * ```
     *
     * @param options Target options
     */
    Logger.prototype.toGrayLog = function (options) {
        this.targets["__graylog__"] = new GraylogTarget_1.GraylogTarget(options);
        return this;
    };
    /**
     * Close I/O handles of all targets
     */
    Logger.prototype.close = function () {
        for (var i in this.targets)
            this.targets[i].close();
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map