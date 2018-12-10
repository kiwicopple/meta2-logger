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
var util = require("util");
var Gelf = require("gelf");
var axios_1 = require("axios");
var interfaces_1 = require("./interfaces");
var BaseTarget_1 = require("./BaseTarget");
var timers_1 = require("timers");
/**
 * GrayLog (GELF) target class
 */
var GraylogTarget = /** @class */ (function (_super) {
    __extends(GraylogTarget, _super);
    /**
     * GrayLog target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new GraylogTarget({
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
     * 	transport: "GELF",
     * 	additionalFields: {
     * 		myField: "myValue"
     * 	},
     * 	debugGelfClient: true
     * }));
     * ```
     *
     * @param options Target options
     */
    function GraylogTarget(options) {
        var _this = _super.call(this, options) || this;
        _this.logLevelMap = {};
        // Define log level mapping
        _this.logLevelMap[interfaces_1.LOG_LEVEL.DEBUG] = 7;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.INFO] = 6;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.NOTICE] = 5;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.WARN] = 4;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.ERROR] = 3;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.CRITICAL] = 2;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.ALERT] = 1;
        _this.logLevelMap[interfaces_1.LOG_LEVEL.EMERGENCY] = 0;
        // Assign config
        _this.version = options.version || "1.0";
        _this.host = options.host || "_unspecified_";
        _this.transport = options.transport || "GELF";
        _this.graylogPort = options.graylogPort || 12201;
        _this.graylogHostname = options.graylogHostname;
        _this.facilityPrefix = options.facilityPrefix || "";
        _this.additionalFields = options.additionalFields || {};
        _this.debug = options.debugGelfClient || false;
        var connOpts = {
            graylogPort: options.graylogPort || 12201,
            graylogHostname: options.graylogHostname,
            connection: options.connection || "lan",
            maxChunkSizeWan: options.maxChunkSizeWan || 1420,
            maxChunkSizeLan: options.maxChunkSizeLan || 8154
        };
        if (_this.debug)
            console.log("GrayLog connection opts:", connOpts);
        if (_this.transport === "GELF") {
            _this.gelf = new Gelf(connOpts);
            _this.gelf.on("error", function (err) {
                if (_this.debug)
                    console.error("Failed to sent GrayLog message:", err);
            });
        }
        return _this;
    }
    /**
     * Log message
     *
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     * @param meta Meta-data
     */
    GraylogTarget.prototype.log = function (level, facility, args, meta) {
        if (level > this.level)
            return;
        if (this.facilities.length > 0 && this.facilities.indexOf(facility) < 0)
            return;
        var msgFull = util.format.apply(this, args);
        var msgShort = msgFull.split("\n").shift();
        var logLevel = this.logLevelMap[level] || 3;
        var payload = {
            version: this.version,
            host: this.host,
            short_message: msgShort,
            full_message: msgFull,
            timestamp: Date.now() / 1000,
            level: logLevel,
            facility: this.facilityPrefix + (facility || "default")
        };
        for (var i in this.additionalFields)
            payload["_" + i] = this.additionalFields[i];
        for (var i in meta)
            payload["_" + i] = String(meta[i]);
        if (facility)
            payload["_facility"] = this.facilityPrefix + facility;
        if (this.debug)
            console.log("GrayLog message:", payload);
        this.send(payload);
    };
    /**
     * Send message to GrayLog server
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     */
    GraylogTarget.prototype.send = function (payload) {
        if (this.transport === "GELF")
            this.gelf.emit("gelf.log", payload);
        else
            axios_1.default.post(this.graylogHostname + ":" + this.graylogPort + "/gelf", payload);
    };
    /**
     * Close socket handle
     */
    GraylogTarget.prototype.close = function () {
        var _this = this;
        // Close directly
        if (this.gelf.client._bindState === 2) {
            this.gelf.closeSocket();
            // Wait for socket to init
        }
        else {
            timers_1.setTimeout(function () {
                _this.gelf.closeSocket();
            }, 1000);
        }
    };
    return GraylogTarget;
}(BaseTarget_1.BaseTarget));
exports.GraylogTarget = GraylogTarget;
//# sourceMappingURL=GraylogTarget.js.map