"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var util = require("util");
var interfaces_1 = require("./interfaces");
/**
 * Logger base target class
 */
var BaseTarget = /** @class */ (function () {
    /**
     * Base logger target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new BaseTarget({
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ]
     * }));
     * ```
     *
     * @param options Target options
     */
    function BaseTarget(options) {
        this.level = interfaces_1.LOG_LEVEL.INFO;
        this.facilities = [];
        this.timestamp = true;
        this.levelLabels = {};
        if (options.level)
            this.level = options.level;
        if (options.facilities)
            this.facilities = options.facilities;
        if (options.timestamp !== undefined)
            this.timestamp = options.timestamp;
        this.levelLabels[interfaces_1.LOG_LEVEL.DEBUG] = "debug";
        this.levelLabels[interfaces_1.LOG_LEVEL.INFO] = "info";
        this.levelLabels[interfaces_1.LOG_LEVEL.NOTICE] = "notice";
        this.levelLabels[interfaces_1.LOG_LEVEL.WARN] = "warn";
        this.levelLabels[interfaces_1.LOG_LEVEL.ERROR] = "error";
        this.levelLabels[interfaces_1.LOG_LEVEL.CRITICAL] = "critical";
        this.levelLabels[interfaces_1.LOG_LEVEL.ALERT] = "alert";
        this.levelLabels[interfaces_1.LOG_LEVEL.EMERGENCY] = "emergency";
    }
    /**
     * Sets log level
     *
     * @param level New log level
     */
    BaseTarget.prototype.setLevel = function (level) {
        this.level = level;
    };
    /**
     * Returns log level
     */
    BaseTarget.prototype.getLevel = function () {
        return this.level;
    };
    /**
     * Log message
     *
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     * @param meta Meta data
     */
    BaseTarget.prototype.log = function (level, facility, args, meta) {
        if (level > this.level)
            return;
        if (this.facilities.length > 0 && this.facilities.indexOf(facility) < 0)
            return;
        var msg = [util.format.apply(this, args)];
        // Add trace
        if (meta["trace"])
            msg.push("\n  " + meta["trace"]);
        // Add meta data
        for (var i in meta)
            if (i !== "trace")
                msg.unshift("(" + i + "=" + String(meta[i]) + ")");
        // Add facility
        if (facility)
            msg.unshift("[" + facility + "]");
        // Add level
        msg.unshift(this.levelLabels[level] + ":");
        // Add timestamp
        if (this.timestamp) {
            var t = new Date();
            msg.unshift(util.format("%s-%s-%s %s:%s:%s", t.getFullYear(), ("0" + (t.getMonth() + 1)).substr(-2), ("0" + (t.getDate() + 1)).substr(-2), ("0" + t.getHours()).substr(-2), ("0" + t.getMinutes()).substr(-2), ("0" + t.getSeconds()).substr(-2)));
        }
        this.write(level, facility, msg, meta);
    };
    /**
     * Write formatted log message - should be overriden, not implemented (does nothing)
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     * @param meta Meta-data
     */
    BaseTarget.prototype.write = function (level, facility, msg, meta) {
        return;
    };
    /**
     * Close all I/O handles - should be overriden, not implemented (does nothing)
     */
    BaseTarget.prototype.close = function () {
        return;
    };
    return BaseTarget;
}());
exports.BaseTarget = BaseTarget;
//# sourceMappingURL=BaseTarget.js.map