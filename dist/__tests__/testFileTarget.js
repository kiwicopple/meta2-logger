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
describe("FileTarget class", function () {
    var logFilenameBase = os.tmpdir() + "/meta2-logger-fileTarget-test.log.";
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
        var target = new index_1.FileTarget(logFilenames.construct, {
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(target).toBeInstanceOf(index_1.FileTarget);
    });
    it("should log message", function (done) {
        var target = new index_1.FileTarget(logFilenames.log1, {
            level: index_1.LOG_LEVEL.DEBUG,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.log1, { encoding: "utf-8" })).toEqual("info: msg\n");
            done();
        }, writeTimeout);
    });
    it("should append multiple messages", function (done) {
        var target = new index_1.FileTarget(logFilenames.logMulti, {
            level: index_1.LOG_LEVEL.DEBUG,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg1"], {});
        target.log(index_1.LOG_LEVEL.DEBUG, null, ["msg2"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.logMulti, { encoding: "utf-8" })).toEqual("info: msg1\ndebug: msg2\n");
            done();
        }, writeTimeout * 2);
    });
    it("should log message with higher severity", function (done) {
        var target = new index_1.FileTarget(logFilenames.higher, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.ALERT, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.higher, { encoding: "utf-8" })).toEqual("alert: msg\n");
            done();
        }, writeTimeout);
    });
    it("should log message with equal severity", function (done) {
        var target = new index_1.FileTarget(logFilenames.equal, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.equal, { encoding: "utf-8" })).toEqual("info: msg\n");
            done();
        }, writeTimeout);
    });
    it("should NOT log message with lower severity", function (done) {
        var target = new index_1.FileTarget(logFilenames.lower, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        target.log(index_1.LOG_LEVEL.DEBUG, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.lower, { encoding: "utf-8" })).toEqual("info: msg\n");
            done();
        }, writeTimeout);
    });
    it("should log message within specified facility", function (done) {
        var target = new index_1.FileTarget(logFilenames.inFacility, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
            facilities: ["test"]
        });
        target.log(index_1.LOG_LEVEL.INFO, "test", ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.inFacility, { encoding: "utf-8" })).toEqual("info: [test] msg\n");
            done();
        }, writeTimeout);
    });
    it("should NOT log message out of specified facility", function (done) {
        var target = new index_1.FileTarget(logFilenames.outFacility, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
            facilities: ["test"]
        });
        target.log(index_1.LOG_LEVEL.INFO, "test", ["msg"], {});
        target.log(index_1.LOG_LEVEL.DEBUG, "fac", ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.outFacility, { encoding: "utf-8" })).toEqual("info: [test] msg\n");
            done();
        }, writeTimeout);
    });
    it("should log properly formatted message", function (done) {
        var target = new index_1.FileTarget(logFilenames.formatted, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
        });
        target.log(index_1.LOG_LEVEL.INFO, "fac", ["testStr %s: %d", "sub", 42], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.formatted, { encoding: "utf-8" })).toEqual("info: [fac] testStr sub: 42\n");
            done();
        }, writeTimeout);
    });
    it("should log message with timestamp", function (done) {
        var target = new index_1.FileTarget(logFilenames.withTimestamp, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: true,
        });
        target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.withTimestamp, { encoding: "utf-8" })).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} info: msg\n/);
            done();
        }, writeTimeout);
    });
    it("should log meta-data", function (done) {
        var target = new index_1.FileTarget(logFilenames.metaData, {
            level: index_1.LOG_LEVEL.INFO,
            timestamp: false,
        });
        target.log(index_1.LOG_LEVEL.INFO, "facility", ["msg"], { key: "value" });
        setTimeout(function () {
            target.close();
            expect(fs.readFileSync(logFilenames.metaData, { encoding: "utf-8" })).toEqual("info: [facility] (key=value) msg\n");
            done();
        }, writeTimeout);
    });
});
//# sourceMappingURL=testFileTarget.js.map