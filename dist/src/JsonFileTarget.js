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
var FileTarget_1 = require("./FileTarget");
/**
 * JSON target class
 */
var JsonFileTarget = /** @class */ (function (_super) {
    __extends(JsonFileTarget, _super);
    function JsonFileTarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Opens file handle to log file
     */
    JsonFileTarget.prototype.init = function () {
        if (this.initialized)
            return;
        // Create log file
        if (!fs.existsSync(this.filename))
            fs.writeFileSync(this.filename, "{}", "utf-8");
        _super.prototype.init.call(this);
    };
    /**
     * Log message
     *
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     * @param meta Meta-data
     */
    JsonFileTarget.prototype.log = function (level, facility, args, meta) {
        if (level > this.level)
            return;
        if (this.facilities.length > 0 && this.facilities.indexOf(facility) < 0)
            return;
        this.write(level, facility, args, meta);
    };
    /**
     * Write log message
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Message object
     */
    JsonFileTarget.prototype.write = function (level, facility, message, meta) {
        this.init();
        fs.write(this.fd, "," + JSON.stringify({
            timestamp: Date.now() / 1000,
            level: level,
            facility: facility,
            msg: message,
            meta: meta
        }), null, "utf-8", function () { });
    };
    /**
     * Close I/O handle
     */
    JsonFileTarget.prototype.close = function () {
        if (this.initialized && this.fd)
            fs.closeSync(this.fd);
    };
    return JsonFileTarget;
}(FileTarget_1.FileTarget));
exports.JsonFileTarget = JsonFileTarget;
//# sourceMappingURL=JsonFileTarget.js.map