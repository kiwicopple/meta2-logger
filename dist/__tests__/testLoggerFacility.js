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
describe("LoggerFacility class", function () {
    function mockTarget() {
        var target = {
            log: jest.fn(),
            close: jest.fn(),
            setLevel: jest.fn(),
            getLevel: jest.fn()
        };
        return target;
    }
    function mockLoggerFacilityWithTarget(facilityName) {
        var logger = new index_1.Logger();
        var target = mockTarget();
        var facility = new index_1.LoggerFacility(logger, facilityName);
        logger.to("trg", target);
        return {
            logger: logger,
            target: target,
            facility: facility
        };
    }
    it("should construct", function () {
        var logger = new index_1.Logger();
        var facility = new index_1.LoggerFacility(logger, "fac");
        expect(facility).toBeInstanceOf(index_1.LoggerFacility);
    });
    it("should construct with configuration", function () {
        var logger = new index_1.Logger();
        var facility = new index_1.LoggerFacility(logger, "fac", {
            level: index_1.LOG_LEVEL.WARN
        });
        expect(facility).toBeInstanceOf(index_1.LoggerFacility);
        expect(facility.getLevel()).toEqual(index_1.LOG_LEVEL.WARN);
    });
    it("#log should log message and take first argument as log level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.log(index_1.LOG_LEVEL.INFO, "arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.INFO, "fac", ["arg1", "arg2"], {});
    });
    it("#debug should log message with DEBUG level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.debug("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.DEBUG, "fac", ["arg1", "arg2"], {});
    });
    it("#info should log message with INFO level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.info("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.INFO, "fac", ["arg1", "arg2"], {});
    });
    it("#notice should log message with NOTICE level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.notice("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.NOTICE, "fac", ["arg1", "arg2"], {});
    });
    it("#warn should log message with WARN level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.warn("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.WARN, "fac", ["arg1", "arg2"], {});
    });
    it("#error should log message with ERROR level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.error("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.ERROR, "fac", ["arg1", "arg2"], {});
    });
    it("#crit should log message with CRITICAL level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.crit("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.CRITICAL, "fac", ["arg1", "arg2"], {});
    });
    it("#alert should log message with ALERT level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.alert("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.ALERT, "fac", ["arg1", "arg2"], {});
    });
    it("#emerg should log message with EMERGENCY level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.emerg("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.EMERGENCY, "fac", ["arg1", "arg2"], {});
    });
    it("#panic should log message with EMERGENCY level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.panic("arg1", "arg2");
        expect(mock.target.log).toHaveBeenLastCalledWith(index_1.LOG_LEVEL.EMERGENCY, "fac", ["arg1", "arg2"], {});
    });
    it("#setLevel should change log level", function () {
        var mock = mockLoggerFacilityWithTarget("fac");
        mock.facility.setLevel(index_1.LOG_LEVEL.INFO);
        mock.facility.debug("arg1", "arg2");
        expect(mock.facility.getLevel()).toEqual(index_1.LOG_LEVEL.INFO);
        expect(mock.target.log).toHaveBeenCalledTimes(0);
    });
});
//# sourceMappingURL=testLoggerFacility.js.map