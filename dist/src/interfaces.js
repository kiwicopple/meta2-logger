"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Log levels
 */
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL[LOG_LEVEL["DEBUG"] = 7] = "DEBUG";
    LOG_LEVEL[LOG_LEVEL["INFO"] = 6] = "INFO";
    LOG_LEVEL[LOG_LEVEL["NOTICE"] = 5] = "NOTICE";
    LOG_LEVEL[LOG_LEVEL["WARN"] = 4] = "WARN";
    LOG_LEVEL[LOG_LEVEL["ERROR"] = 3] = "ERROR";
    LOG_LEVEL[LOG_LEVEL["CRITICAL"] = 2] = "CRITICAL";
    LOG_LEVEL[LOG_LEVEL["ALERT"] = 1] = "ALERT";
    LOG_LEVEL[LOG_LEVEL["EMERGENCY"] = 0] = "EMERGENCY";
})(LOG_LEVEL = exports.LOG_LEVEL || (exports.LOG_LEVEL = {}));
/**
 * String to log level mapping
 */
exports.LOG_LEVEL_NAME_MAP = {
    debug: LOG_LEVEL.DEBUG,
    info: LOG_LEVEL.INFO,
    notice: LOG_LEVEL.NOTICE,
    warn: LOG_LEVEL.WARN,
    warning: LOG_LEVEL.WARN,
    error: LOG_LEVEL.ERROR,
    critical: LOG_LEVEL.CRITICAL,
    crit: LOG_LEVEL.CRITICAL,
    alert: LOG_LEVEL.ALERT,
    emergency: LOG_LEVEL.EMERGENCY,
    emerg: LOG_LEVEL.EMERGENCY,
    panic: LOG_LEVEL.EMERGENCY
};
/**
 * Log level to string mapping
 */
exports.LOG_LEVEL_NAME_MAP_INV = {};
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.DEBUG] = "debug";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.INFO] = "info";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.NOTICE] = "notice";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.WARN] = "warn";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.ERROR] = "error";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.CRITICAL] = "critical";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.ALERT] = "alert";
exports.LOG_LEVEL_NAME_MAP_INV[LOG_LEVEL.EMERGENCY] = "emergency";
//# sourceMappingURL=interfaces.js.map