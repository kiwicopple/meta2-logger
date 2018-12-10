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
var colors = require("colors");
var interfaces_1 = require("./interfaces");
var BaseTarget_1 = require("./BaseTarget");
/**
 * Console target class
 */
var ConsoleTarget = /** @class */ (function (_super) {
    __extends(ConsoleTarget, _super);
    /**
     * Console target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new ConsoleTarget({
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * 	colorize: true
     * }));
     * ```
     *
     * @param options Target options
     */
    function ConsoleTarget(options) {
        var _this = _super.call(this, options) || this;
        _this.colorize = true;
        _this.colors = {};
        if (options.colorize !== undefined)
            _this.colorize = options.colorize;
        _this.colors[interfaces_1.LOG_LEVEL.DEBUG] = colors.cyan;
        _this.colors[interfaces_1.LOG_LEVEL.INFO] = colors.gray;
        _this.colors[interfaces_1.LOG_LEVEL.NOTICE] = colors.white;
        _this.colors[interfaces_1.LOG_LEVEL.WARN] = colors.yellow;
        _this.colors[interfaces_1.LOG_LEVEL.ERROR] = colors.red;
        _this.colors[interfaces_1.LOG_LEVEL.CRITICAL] = colors.red;
        _this.colors[interfaces_1.LOG_LEVEL.ALERT] = colors.red;
        _this.colors[interfaces_1.LOG_LEVEL.EMERGENCY] = colors.magenta;
        return _this;
    }
    /**
     * Write formatted log message
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     * @param meta Meta-data
     */
    ConsoleTarget.prototype.write = function (level, facility, message, meta) {
        if (this.colorize && this.colors[level])
            console.log(this.colors[level](message.join(" ")));
        else
            console.log(message.join(" "));
    };
    return ConsoleTarget;
}(BaseTarget_1.BaseTarget));
exports.ConsoleTarget = ConsoleTarget;
//# sourceMappingURL=ConsoleTarget.js.map