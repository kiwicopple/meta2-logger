"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var dgram = require("dgram");
var index_1 = require("../src/index");
describe("GraylogTarget class", function () {
    function mockTarget(opts) {
        var target = new index_1.GraylogTarget(opts);
        target.close();
        var _target = target;
        var output = { payload: null };
        _target.send = jest.fn(function (payload) {
            output.payload = payload;
        });
        return {
            target: target,
            send: _target.send,
            output: output
        };
    }
    it("should construct", function () {
        var target = new index_1.GraylogTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost"
        });
        target.close();
        expect(target).toBeInstanceOf(index_1.GraylogTarget);
    });
    it("should log message", function () {
        var mock = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost"
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            full_message: "msg",
            host: "_unspecified_",
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.INFO],
            short_message: "msg",
            version: "1.0",
        });
    });
    it("should log message with version 1.1", function () {
        var mock = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost",
            version: "1.1"
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            full_message: "msg",
            host: "_unspecified_",
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.INFO],
            short_message: "msg",
            version: "1.1",
        });
    });
    it("should log message with host defined", function () {
        var mock = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost",
            host: "myHost"
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            full_message: "msg",
            host: "myHost",
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.INFO],
            short_message: "msg",
            version: "1.0",
        });
    });
    it("should log message with additional fields", function () {
        var mock = mockTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost",
            additionalFields: {
                key: "val"
            }
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            full_message: "msg",
            host: "_unspecified_",
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.INFO],
            short_message: "msg",
            version: "1.0",
            _key: "val"
        });
    });
    it("should log message with facility", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.DEBUG
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.INFO],
            short_message: "msg",
            full_message: "msg",
            _facility: "fac"
        });
    });
    it("should log message with higher severity", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.INFO
        });
        mock.target.log(index_1.LOG_LEVEL.ALERT, "fac", ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.ALERT],
            short_message: "msg",
            full_message: "msg",
            _facility: "fac"
        });
    });
    it("should log message with equal severity", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.INFO
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.INFO],
            short_message: "msg",
            full_message: "msg",
            _facility: "fac"
        });
    });
    it("should NOT log message with lower severity", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.INFO
        });
        mock.target.log(index_1.LOG_LEVEL.DEBUG, "fac", ["msg"], {});
        expect(mock.send).not.toBeCalled();
        expect(mock.output.payload).toEqual(null);
    });
    it("should log message within configured facilities", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.DEBUG,
            facilities: ["test"]
        });
        mock.target.log(index_1.LOG_LEVEL.ERROR, "test", ["msg"], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.ERROR],
            short_message: "msg",
            full_message: "msg",
            _facility: "test"
        });
    });
    it("should NOT log message out of configured facilities", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.DEBUG,
            facilities: ["test"]
        });
        mock.target.log(index_1.LOG_LEVEL.ERROR, "fac", ["msg"], {});
        expect(mock.send).not.toBeCalled();
        expect(mock.output.payload).toEqual(null);
    });
    it("should log properly formatted message", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.DEBUG,
        });
        mock.target.log(index_1.LOG_LEVEL.ALERT, "fac", ["testStr %s: %d", "sub", 42], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.ALERT],
            short_message: "testStr sub: 42",
            full_message: "testStr sub: 42",
            _facility: "fac"
        });
    });
    it("should parse short message from first line", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.DEBUG,
        });
        mock.target.log(index_1.LOG_LEVEL.CRITICAL, "fac", ["First line %s\nSecond line: %d", "sub", 42], {});
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.CRITICAL],
            short_message: "First line sub",
            full_message: "First line sub\nSecond line: 42",
            _facility: "fac"
        });
    });
    it("should log message meta-data", function () {
        var mock = mockTarget({
            graylogHostname: "localhost",
            level: index_1.LOG_LEVEL.DEBUG,
        });
        mock.target.log(index_1.LOG_LEVEL.CRITICAL, "fac", ["msg"], { key: "value" });
        expect(mock.send).toHaveBeenCalled();
        expect(mock.output.payload).toMatchObject({
            level: mock.target.logLevelMap[index_1.LOG_LEVEL.CRITICAL],
            short_message: "msg",
            full_message: "msg",
            _facility: "fac",
            _key: "value"
        });
    });
    it("should send payload to server", function (done) {
        var serverPort = 11999;
        var target = new index_1.GraylogTarget({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost",
            graylogPort: serverPort
        });
        var server = dgram.createSocket("udp4");
        server.on("message", function (msg, rinfo) {
            server.close();
            target.close();
            done();
        });
        target.log(index_1.LOG_LEVEL.NOTICE, null, ["hello server"], {});
        server.bind(serverPort);
    });
});
//# sourceMappingURL=testGraylogTarget.js.map