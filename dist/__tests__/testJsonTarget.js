"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var os = require("os");
var fs = require("fs");
var index_1 = require("../src/index");
describe("JsonTarget class", function () {
    var logFilenameBase = os.tmpdir() + "/meta2-logger-jsonTarget-test.log.";
    var logFilenames = {
        construct: logFilenameBase + "construct",
        log1: logFilenameBase + "log1",
        logMulti: logFilenameBase + "logMulti",
        lower: logFilenameBase + "lower",
        higher: logFilenameBase + "higher",
        equal: logFilenameBase + "equal",
        inFacility: logFilenameBase + "inFacility",
        outFacility: logFilenameBase + "outFacility",
        formatted: logFilenameBase + "formatted",
        withTimestamp: logFilenameBase + "withTimestamp",
        metaData: logFilenameBase + "metaData"
    };
    var writeTimeout = 60;
    function parseLog(filename) {
        var log = fs.readFileSync(filename, { encoding: "utf-8" });
        return JSON.parse("[" + log + "]");
    }
    afterAll(function () {
        // tslint:disable-next-line:forin
        for (var i in logFilenames) {
            try {
                fs.statSync(logFilenames[i]);
                fs.unlinkSync(logFilenames[i]);
            }
            catch (err) {
                // Pass
            }
        }
    });
    it("should construct", function () {
        var target = new index_1.JsonFileTarget(logFilenames.construct, {
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(target).toBeInstanceOf(index_1.JsonFileTarget);
    });
    it("should log message", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.log1, {
            level: index_1.LOG_LEVEL.DEBUG
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.log1);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual(null);
            expect(log[1].msg).toEqual(["msg"]);
            done();
        }, writeTimeout);
    });
    it("should append multiple messages", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.logMulti, {
            level: index_1.LOG_LEVEL.DEBUG,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg1"], {});
        target.log(index_1.LOG_LEVEL.DEBUG, null, ["msg2"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.logMulti);
            expect(log).toHaveLength(3);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual(null);
            expect(log[1].msg).toEqual(["msg1"]);
            expect(log[2]).toHaveProperty("timestamp");
            expect(log[2].level).toEqual(index_1.LOG_LEVEL.DEBUG);
            expect(log[2].facility).toEqual(null);
            expect(log[2].msg).toEqual(["msg2"]);
            done();
        }, writeTimeout * 2);
    });
    it("should log message with higher severity", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.higher, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.ALERT, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.higher);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.ALERT);
            expect(log[1].facility).toEqual(null);
            expect(log[1].msg).toEqual(["msg"]);
            done();
        }, writeTimeout);
    });
    it("should log message with equal severity", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.equal, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.equal);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual(null);
            expect(log[1].msg).toEqual(["msg"]);
            done();
        }, writeTimeout);
    });
    it("should NOT log message with lower severity", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.lower, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        target.log(index_1.LOG_LEVEL.DEBUG, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.lower);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual(null);
            expect(log[1].msg).toEqual(["msg"]);
            expect(log[2]).toBeUndefined();
            done();
        }, writeTimeout);
    });
    it("should log message within specified facility", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.inFacility, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
            facilities: ["test"]
        });
        target.log(index_1.LOG_LEVEL.INFO, "test", ["msg"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.inFacility);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual("test");
            expect(log[1].msg).toEqual(["msg"]);
            done();
        }, writeTimeout);
    });
    it("should NOT log message out of specified facility", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.outFacility, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
            facilities: ["test"]
        });
        target.log(index_1.LOG_LEVEL.INFO, "test", ["msg"], {});
        target.log(index_1.LOG_LEVEL.DEBUG, "fac", ["msg"], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.outFacility);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual("test");
            expect(log[1].msg).toEqual(["msg"]);
            expect(log[2]).toBeUndefined();
            done();
        }, writeTimeout);
    });
    it("should log message arguments", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.formatted, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
        });
        target.log(index_1.LOG_LEVEL.INFO, "fac", ["testStr %s: %d", "sub", 42], {});
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.formatted);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual("fac");
            expect(log[1].msg).toEqual(["testStr %s: %d", "sub", 42]);
            done();
        }, writeTimeout);
    });
    it("should log message meta-data", function (done) {
        var target = new index_1.JsonFileTarget(logFilenames.metaData, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
        });
        target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], { key: "value" });
        setTimeout(function () {
            target.close();
            var log = parseLog(logFilenames.metaData);
            expect(log).toHaveLength(2);
            expect(log[1]).toHaveProperty("timestamp");
            expect(log[1].level).toEqual(index_1.LOG_LEVEL.INFO);
            expect(log[1].facility).toEqual("fac");
            expect(log[1].msg).toEqual(["msg"]);
            expect(log[1].meta).toMatchObject({
                key: "value"
            });
            done();
        }, writeTimeout);
    });
});
//# sourceMappingURL=testJsonTarget.js.map