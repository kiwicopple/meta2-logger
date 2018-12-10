"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("./interfaces");
var Logger_1 = require("./Logger");
__export(require("./interfaces"));
__export(require("./util"));
__export(require("./Logger"));
__export(require("./LoggerFacility"));
__export(require("./BaseTarget"));
__export(require("./ConsoleTarget"));
__export(require("./MemoryTarget"));
__export(require("./FileTarget"));
__export(require("./JsonFileTarget"));
__export(require("./GraylogTarget"));
var globalInstance = new Logger_1.Logger();
globalInstance.toConsole({
    level: interfaces_1.LOG_LEVEL.INFO,
    colorize: true,
    timestamp: false
});
// Export
exports.default = globalInstance;
//# sourceMappingURL=index.js.map