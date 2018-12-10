"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
describe("ConsoleTarget class", function () {
    function mockTarget(opts) {
        if (opts === void 0) { opts = { level: index_1.LOG_LEVEL.DEBUG }; }
        return new index_1.MemoryTarget(opts);
    }
    it("should construct", function () {
        var target = new index_1.MemoryTarget({
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(target).toBeInstanceOf(index_1.MemoryTarget);
    });
    it("should log message", function () {
        var target = mockTarget();
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], { key: "value" });
        var messages = target.getMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0]).toHaveProperty("timestamp");
        expect(messages[0].level).toEqual(index_1.LOG_LEVEL.INFO);
        expect(messages[0].facility).toEqual(null);
        expect(messages[0].meta).toEqual({ key: "value" });
        expect(messages[0].message).toEqual("msg");
    });
    it("should log message with facility", function () {
        var target = mockTarget();
        target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0]).toHaveProperty("timestamp");
        expect(messages[0].level).toEqual(index_1.LOG_LEVEL.INFO);
        expect(messages[0].facility).toEqual("fac");
        expect(messages[0].meta).toEqual({});
        expect(messages[0].message).toEqual("msg");
    });
    // ---
    it("should log message with higher severity", function () {
        var target = mockTarget({
            level: index_1.LOG_LEVEL.INFO
        });
        target.log(index_1.LOG_LEVEL.ALERT, "fac", ["msg"], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0].level).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(messages[0].facility).toEqual("fac");
        expect(messages[0].message).toEqual("msg");
    });
    it("should log message with equal severity", function () {
        var target = mockTarget({
            level: index_1.LOG_LEVEL.INFO
        });
        target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0].level).toEqual(index_1.LOG_LEVEL.INFO);
        expect(messages[0].facility).toEqual("fac");
        expect(messages[0].message).toEqual("msg");
    });
    it("should NOT log message with lower severity", function () {
        var target = mockTarget({
            level: index_1.LOG_LEVEL.INFO
        });
        target.log(index_1.LOG_LEVEL.DEBUG, "fac", ["msg"], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(0);
    });
    it("should log message within configured facilities", function () {
        var target = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            facilities: ["test"]
        });
        target.log(index_1.LOG_LEVEL.ERROR, "test", ["msg"], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0].level).toEqual(index_1.LOG_LEVEL.ERROR);
        expect(messages[0].facility).toEqual("test");
        expect(messages[0].message).toEqual("msg");
    });
    it("should NOT log message out of configured facilities", function () {
        var target = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            facilities: ["test"]
        });
        target.log(index_1.LOG_LEVEL.ERROR, "fac", ["msg"], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(0);
    });
    it("should log properly formatted message", function () {
        var target = mockTarget();
        target.log(index_1.LOG_LEVEL.ALERT, "fac", ["testStr %s: %d", "sub", 42], {});
        var messages = target.getMessages();
        expect(messages.length).toEqual(1);
        expect(messages[0].level).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(messages[0].facility).toEqual("fac");
        expect(messages[0].message).toEqual("testStr sub: 42");
    });
    it("should not exceed message limit", function () {
        var target = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            limit: 2
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], { key: "value" });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], { key: "value" });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], { key: "value" });
        var messages = target.getMessages();
        expect(messages.length).toEqual(2);
    });
});
//# sourceMappingURL=testMemoryTarget.js.map