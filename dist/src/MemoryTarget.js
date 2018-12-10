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
var events_1 = require("events");
var BaseTarget_1 = require("./BaseTarget");
/**
 * Memory target class
 */
var MemoryTarget = /** @class */ (function (_super) {
    __extends(MemoryTarget, _super);
    /**
     * Memory logger target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new MemoryTarget({
     * 	level: LOG_LEVEL.DEBUG,
     * 	facilities: [ "server", "broker" ],
     *  limit: 1000
     * }));
     * ```
     *
     * @param options Target options
     */
    function MemoryTarget(options) {
        var _this = _super.call(this, options) || this;
        /** Stored messages */
        _this.messages = [];
        _this.limit = options.limit || 1000;
        _this.emitter = new events_1.EventEmitter();
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
    MemoryTarget.prototype.log = function (level, facility, args, meta) {
        if (level > this.level)
            return;
        if (this.facilities.length > 0 && this.facilities.indexOf(facility) < 0)
            return;
        var message = {
            timestamp: Date.now() / 1000,
            level: level,
            facility: facility,
            meta: meta,
            message: util.format.apply(this, args)
        };
        this.messages.push(message);
        if (this.messages.length > this.limit)
            this.messages.shift();
        this.emitter.emit("message", message);
    };
    /**
     * Return stored messages
     */
    MemoryTarget.prototype.getMessages = function () {
        return this.messages;
    };
    /**
     * Remove all stored messages
     */
    MemoryTarget.prototype.clearMessages = function () {
        this.messages = [];
    };
    return MemoryTarget;
}(BaseTarget_1.BaseTarget));
exports.MemoryTarget = MemoryTarget;
//# sourceMappingURL=MemoryTarget.js.map