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
var fs = require("fs");
var BaseTarget_1 = require("./BaseTarget");
/**
 * File target class
 */
var FileTarget = /** @class */ (function (_super) {
    __extends(FileTarget, _super);
    /**
     * File target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new FileTarget("myLogFile.log", {
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * }));
     * ```
     *
     * @param filename Log filename
     * @param options Target options
     */
    function FileTarget(filename, options) {
        var _this = _super.call(this, options) || this;
        _this.filename = filename;
        _this.initialized = false;
        return _this;
    }
    /**
     * Opens file handle to log file
     */
    FileTarget.prototype.init = function () {
        if (this.initialized)
            return;
        this.fd = fs.openSync(this.filename, "a");
        this.initialized = true;
    };
    /**
     * Write formatted log message
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     * @param meta Meta-data
     */
    FileTarget.prototype.write = function (level, facility, message, meta) {
        this.init();
        fs.write(this.fd, message.join(" ") + "\n", null, "utf-8", function () { });
    };
    /**
     * Close I/O handle
     */
    FileTarget.prototype.close = function () {
        if (this.initialized && this.fd)
            fs.closeSync(this.fd);
    };
    return FileTarget;
}(BaseTarget_1.BaseTarget));
exports.FileTarget = FileTarget;
//# sourceMappingURL=FileTarget.js.map