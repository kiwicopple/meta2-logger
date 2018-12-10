"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var colors = require("colors");
var index_1 = require("../src/index");
describe("ConsoleTarget class", function () {
    function mockTarget(opts) {
        if (opts === void 0) { opts = { level: index_1.LOG_LEVEL.DEBUG }; }
        return new index_1.ConsoleTarget(opts);
    }
    function mockConsole() {
        var mem = { output: null };
        var consoleMock = jest.spyOn(global.console, "log");
        consoleMock.mockImplementation(function (args) {
            mem.output = args;
        });
        return mem;
    }
    it("should construct", function () {
        var target = new index_1.ConsoleTarget({
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(target).toBeInstanceOf(index_1.ConsoleTarget);
    });
    it("should log message", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.DEBUG })
            .log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(consoleMock.output).toEqual("info: msg");
    });
    it("should log message with higher severity", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.INFO })
            .log(index_1.LOG_LEVEL.ALERT, null, ["msg"], {});
        expect(consoleMock.output).toEqual("alert: msg");
    });
    it("should log message with equal severity", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.INFO })
            .log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(consoleMock.output).toEqual("info: msg");
    });
    it("should NOT log message with lower severity", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.INFO })
            .log(index_1.LOG_LEVEL.DEBUG, null, ["msg"], {});
        expect(consoleMock.output).toEqual(null);
    });
    it("should log message within specified facility", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.DEBUG, facilities: ["test"] })
            .log(index_1.LOG_LEVEL.INFO, "test", ["msg"], {});
        expect(consoleMock.output).toEqual("info: [test] msg");
    });
    it("should NOT log message out of specified facilities", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.DEBUG, facilities: ["test"] })
            .log(index_1.LOG_LEVEL.INFO, "blah", ["msg"], {});
        expect(consoleMock.output).toEqual(null);
    });
    it("should log properly formatted message", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.DEBUG })
            .log(index_1.LOG_LEVEL.INFO, "fac", ["testStr %s: %d", "sub", 42], {});
        expect(consoleMock.output).toEqual("info: [fac] testStr sub: 42");
    });
    it("should log message with timestamp", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: true, colorize: false, level: index_1.LOG_LEVEL.DEBUG })
            .log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(consoleMock.output).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} info: msg/);
    });
    it("should print colorized messages", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: true, level: index_1.LOG_LEVEL.DEBUG })
            .log(index_1.LOG_LEVEL.DEBUG, null, ["msg"], {});
        expect(consoleMock.output).toEqual(colors.cyan("debug: msg"));
    });
    it("should log meta-data", function () {
        var consoleMock = mockConsole();
        mockTarget({ timestamp: false, colorize: false, level: index_1.LOG_LEVEL.DEBUG })
            .log(index_1.LOG_LEVEL.DEBUG, "facility", ["msg"], { key: "value" });
        expect(consoleMock.output).toEqual("debug: [facility] (key=value) msg");
    });
});
//# sourceMappingURL=testConsoleTarget.js.map