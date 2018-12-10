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
var index_1 = require("../src/index");
describe("ConsoleTarget class", function () {
    var MyTarget = /** @class */ (function (_super) {
        __extends(MyTarget, _super);
        function MyTarget(writeCb, opts) {
            var _this = _super.call(this, opts) || this;
            _this.writeCb = writeCb;
            return _this;
        }
        MyTarget.prototype.write = function (level, facility, msg) {
            this.writeCb.call(null, level, facility, msg);
        };
        return MyTarget;
    }(index_1.BaseTarget));
    function mockTarget(opts) {
        var out = {
            level: null,
            facility: null,
            msg: null
        };
        var writeMock = jest.fn(function (level, facility, msg) {
            out.level = level;
            out.facility = facility;
            out.msg = msg;
        });
        var target = new MyTarget(writeMock, opts);
        return {
            target: target,
            write: writeMock,
            output: out
        };
    }
    it("should construct", function () {
        var target = new MyTarget(null, {
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(target).toBeInstanceOf(index_1.BaseTarget);
        expect(target.getLevel()).toEqual(index_1.LOG_LEVEL.DEBUG);
    });
    it("#setLevel should change log level", function () {
        var target = new MyTarget(null, {
            level: index_1.LOG_LEVEL.DEBUG
        });
        target.setLevel(index_1.LOG_LEVEL.NOTICE);
        expect(target.getLevel()).toEqual(index_1.LOG_LEVEL.NOTICE);
    });
    it("should log message", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.DEBUG
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, null, ["msg"], {});
        expect(mock.write).toHaveBeenCalled();
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.INFO);
        expect(mock.output.facility).toEqual(null);
        expect(mock.output.msg).toEqual(["info:", "msg"]);
    });
    it("should log message with facility", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.DEBUG
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], {});
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.INFO);
        expect(mock.output.facility).toEqual("fac");
        expect(mock.output.msg).toEqual(["info:", "[fac]", "msg"]);
    });
    it("should log message with higher severity", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.INFO
        });
        mock.target.log(index_1.LOG_LEVEL.ALERT, "fac", ["msg"], {});
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(mock.output.facility).toEqual("fac");
        expect(mock.output.msg).toEqual(["alert:", "[fac]", "msg"]);
    });
    it("should log message with equal severity", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.INFO
        });
        mock.target.log(index_1.LOG_LEVEL.INFO, "fac", ["msg"], {});
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.INFO);
        expect(mock.output.facility).toEqual("fac");
        expect(mock.output.msg).toEqual(["info:", "[fac]", "msg"]);
    });
    it("should NOT log message with lower severity", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.INFO
        });
        mock.target.log(index_1.LOG_LEVEL.DEBUG, "fac", ["msg"], {});
        expect(mock.write).not.toBeCalled();
        expect(mock.output.level).toEqual(null);
        expect(mock.output.facility).toEqual(null);
        expect(mock.output.msg).toEqual(null);
    });
    it("should log message within configured facilities", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.DEBUG,
            facilities: ["test"]
        });
        mock.target.log(index_1.LOG_LEVEL.ERROR, "test", ["msg"], {});
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.ERROR);
        expect(mock.output.facility).toEqual("test");
        expect(mock.output.msg).toEqual(["error:", "[test]", "msg"]);
    });
    it("should NOT log message out of configured facilities", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.DEBUG,
            facilities: ["test"]
        });
        mock.target.log(index_1.LOG_LEVEL.ERROR, "fac", ["msg"], {});
        expect(mock.write).not.toBeCalled();
        expect(mock.output.level).toEqual(null);
        expect(mock.output.facility).toEqual(null);
        expect(mock.output.msg).toEqual(null);
    });
    it("should log properly formatted message", function () {
        var mock = mockTarget({
            timestamp: false,
            level: index_1.LOG_LEVEL.DEBUG,
        });
        mock.target.log(index_1.LOG_LEVEL.ALERT, "fac", ["testStr %s: %d", "sub", 42], {});
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(mock.output.facility).toEqual("fac");
        expect(mock.output.msg).toEqual(["alert:", "[fac]", "testStr sub: 42"]);
    });
    it("should log message with timestamp", function () {
        var mock = mockTarget({
            timestamp: true,
            level: index_1.LOG_LEVEL.DEBUG,
        });
        mock.target.log(index_1.LOG_LEVEL.ALERT, "fac", ["msg"], {});
        expect(mock.output.level).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(mock.output.facility).toEqual("fac");
        expect(mock.output.msg[0]).toMatch(/[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
        expect(mock.output.msg.slice(1)).toEqual(["alert:", "[fac]", "msg"]);
    });
});
//# sourceMappingURL=testBaseTarget.js.map