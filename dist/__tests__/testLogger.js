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
describe("Logger class", function () {
    function mockTarget() {
        var target = {
            log: jest.fn(),
            close: jest.fn(),
            setLevel: jest.fn(),
            getLevel: jest.fn()
        };
        return target;
    }
    function mockLoggerWithTarget() {
        var logger = new index_1.Logger();
        var target = mockTarget();
        logger.to("trg", target);
        return {
            logger: logger,
            target: target
        };
    }
    it("should construct", function () {
        var logger = new index_1.Logger();
        expect(logger).toBeInstanceOf(index_1.Logger);
    });
    it("should construct with configuration", function () {
        var logger = new index_1.Logger({
            level: index_1.LOG_LEVEL.WARN
        });
        expect(logger).toBeInstanceOf(index_1.Logger);
        expect(logger.getLevel()).toEqual(index_1.LOG_LEVEL.WARN);
    });
    it("should assign logging target(s)", function () {
        var logger = new index_1.Logger();
        var target = mockTarget();
        logger.to("trg1", target);
        logger.to("trg2", target);
        expect(logger.getAllTargets()).toEqual({
            trg1: target,
            trg2: target
        });
    });
    it("#getTarget should return target by it's id", function () {
        var logger = new index_1.Logger();
        var target = mockTarget();
        logger.to("trg1", target);
        logger.to("trg2", target);
        expect(logger.getTarget("trg1")).toEqual(target);
    });
    it("#_log should pass log message to all targets", function () {
        var logger = new index_1.Logger();
        var target = mockTarget();
        logger.to("fn1", target);
        logger.to("fn2", target);
        logger._log(index_1.LOG_LEVEL.INFO, "facility", ["arg1", "arg2"]);
        expect(target.log).toHaveBeenCalledTimes(2);
        expect(target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.INFO, "facility", ["arg1", "arg2"], {});
    });
    it("#close should call #close method of all targets", function () {
        var logger = new index_1.Logger();
        var target = mockTarget();
        logger.to("fn1", target);
        logger.to("fn2", target);
        logger.close();
        expect(target.close).toHaveBeenCalledTimes(2);
    });
    it("#facility should return facility wrapper", function () {
        var logger = new index_1.Logger();
        var target = mockTarget();
        logger.to("trg", target);
        var facility = logger.facility("fac");
        // Check facility instance
        expect(facility).toBeInstanceOf(index_1.LoggerFacility);
        // Try to log something
        facility.log(index_1.LOG_LEVEL.INFO, "arg1", "arg2");
        expect(target.log).toHaveBeenCalledTimes(1);
        expect(target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.INFO, "fac", ["arg1", "arg2"], {});
    });
    it("#getFacilities should return registered facilities", function () {
        var logger = new index_1.Logger();
        var facilityA = logger.facility("facA");
        var facilityB = logger.facility("facB");
        expect(logger.getAllFacilities()).toEqual({
            facA: facilityA,
            facB: facilityB
        });
    });
    it("#toConsole should assign ConsoleTarget with id of '__console__'", function () {
        var logger = new index_1.Logger();
        logger.toConsole({
            level: index_1.LOG_LEVEL.DEBUG,
            colorize: true,
        });
        expect(logger.getTarget("__console__")).toBeInstanceOf(index_1.ConsoleTarget);
    });
    it("#toFile should assign FileTarget with id of filename", function () {
        var logger = new index_1.Logger();
        logger.toFile("test.log", {
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(logger.getTarget("test.log")).toBeInstanceOf(index_1.FileTarget);
    });
    it("#toJsonFile should assign JsonTarget with id of filename", function () {
        var logger = new index_1.Logger();
        logger.toJsonFile("test.json", {
            level: index_1.LOG_LEVEL.DEBUG
        });
        expect(logger.getTarget("test.json")).toBeInstanceOf(index_1.JsonFileTarget);
    });
    it("#toGrayLog should assign GraylogTarget with id of '__graylog__'", function () {
        var logger = new index_1.Logger();
        logger.toGrayLog({
            level: index_1.LOG_LEVEL.DEBUG,
            graylogHostname: "localhost"
        });
        expect(logger.getTarget("__graylog__")).toBeInstanceOf(index_1.GraylogTarget);
    });
    it("#log should log message and take first argument as log level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.log(index_1.LOG_LEVEL.INFO, "arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.INFO, null, ["arg1", "arg2"], {});
    });
    it("#debug should log message with DEBUG level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.debug("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.DEBUG, null, ["arg1", "arg2"], {});
    });
    it("#info should log message with INFO level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.info("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.INFO, null, ["arg1", "arg2"], {});
    });
    it("#notice should log message with NOTICE level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.notice("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.NOTICE, null, ["arg1", "arg2"], {});
    });
    it("#warn should log message with WARN level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.warn("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.WARN, null, ["arg1", "arg2"], {});
    });
    it("#error should log message with ERROR level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.error("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.ERROR, null, ["arg1", "arg2"], {});
    });
    it("#crit should log message with CRITICAL level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.crit("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.CRITICAL, null, ["arg1", "arg2"], {});
    });
    it("#alert should log message with ALERT level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.alert("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.ALERT, null, ["arg1", "arg2"], {});
    });
    it("#emerg should log message with EMERGENCY level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.emerg("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.EMERGENCY, null, ["arg1", "arg2"], {});
    });
    it("#panic should log message with EMERGENCY level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.panic("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.EMERGENCY, null, ["arg1", "arg2"], {});
    });
    it("#setLevel should change log level", function () {
        var mock = mockLoggerWithTarget();
        mock.logger.setLevel(index_1.LOG_LEVEL.INFO);
        mock.logger.debug("arg1", "arg2");
        expect(mock.logger.getLevel()).toEqual(index_1.LOG_LEVEL.INFO);
        expect(mock.target.log).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=testLogger.js.map