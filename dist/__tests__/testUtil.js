"use strict";
/*
 * meta2-logger
 *
 * @author Jiri Hybek <jiri@hybek.cz> (https://jiri.hybek.cz/)
 * @copyright 2017 - 2018 Jiří Hýbek
 * @license MIT
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
describe("Utility functions", function () {
    function mockLoggerWithTarget() {
        var logger = new index_1.Logger();
        var target = {
            log: jest.fn(),
            close: jest.fn(),
            setLevel: jest.fn(),
            getLevel: jest.fn()
        };
        logger.to("trg", target);
        return {
            logger: logger,
            target: target
        };
    }
    it("#parseLogLevel should parse proper value", function () {
        // Uppercase variants
        expect(index_1.parseLogLevel("DEBUG")).toEqual(index_1.LOG_LEVEL.DEBUG);
        expect(index_1.parseLogLevel("INFO")).toEqual(index_1.LOG_LEVEL.INFO);
        expect(index_1.parseLogLevel("NOTICE")).toEqual(index_1.LOG_LEVEL.NOTICE);
        expect(index_1.parseLogLevel("WARN")).toEqual(index_1.LOG_LEVEL.WARN);
        expect(index_1.parseLogLevel("WARNING")).toEqual(index_1.LOG_LEVEL.WARN);
        expect(index_1.parseLogLevel("ERROR")).toEqual(index_1.LOG_LEVEL.ERROR);
        expect(index_1.parseLogLevel("CRITICAL")).toEqual(index_1.LOG_LEVEL.CRITICAL);
        expect(index_1.parseLogLevel("CRIT")).toEqual(index_1.LOG_LEVEL.CRITICAL);
        expect(index_1.parseLogLevel("ALERT")).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(index_1.parseLogLevel("EMERGENCY")).toEqual(index_1.LOG_LEVEL.EMERGENCY);
        expect(index_1.parseLogLevel("EMERG")).toEqual(index_1.LOG_LEVEL.EMERGENCY);
        expect(index_1.parseLogLevel("PANIC")).toEqual(index_1.LOG_LEVEL.EMERGENCY);
        // Lower case variants
        expect(index_1.parseLogLevel("debug")).toEqual(index_1.LOG_LEVEL.DEBUG);
        expect(index_1.parseLogLevel("info")).toEqual(index_1.LOG_LEVEL.INFO);
        expect(index_1.parseLogLevel("notice")).toEqual(index_1.LOG_LEVEL.NOTICE);
        expect(index_1.parseLogLevel("warn")).toEqual(index_1.LOG_LEVEL.WARN);
        expect(index_1.parseLogLevel("warning")).toEqual(index_1.LOG_LEVEL.WARN);
        expect(index_1.parseLogLevel("error")).toEqual(index_1.LOG_LEVEL.ERROR);
        expect(index_1.parseLogLevel("critical")).toEqual(index_1.LOG_LEVEL.CRITICAL);
        expect(index_1.parseLogLevel("crit")).toEqual(index_1.LOG_LEVEL.CRITICAL);
        expect(index_1.parseLogLevel("alert")).toEqual(index_1.LOG_LEVEL.ALERT);
        expect(index_1.parseLogLevel("emergency")).toEqual(index_1.LOG_LEVEL.EMERGENCY);
        expect(index_1.parseLogLevel("emerg")).toEqual(index_1.LOG_LEVEL.EMERGENCY);
        expect(index_1.parseLogLevel("panic")).toEqual(index_1.LOG_LEVEL.EMERGENCY);
    });
    it("Logging decorator should assign logger facility", function () {
        var mock = mockLoggerWithTarget();
        var MyClass = /** @class */ (function () {
            function MyClass() {
            }
            MyClass.prototype.doSomething = function () {
                this.log.error("Hello");
            };
            MyClass = __decorate([
                index_1.Logging("facility", {
                    logger: mock.logger,
                    level: index_1.LOG_LEVEL.DEBUG
                })
            ], MyClass);
            return MyClass;
        }());
        var myObj = new MyClass();
        myObj.doSomething();
        expect(mock.target.log).toHaveBeenCalled();
    });
    it("LogMethodCall decorator should log method call", function () {
        var mock = mockLoggerWithTarget();
        var MyClass = /** @class */ (function () {
            function MyClass() {
            }
            MyClass.prototype.doSomething = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return true;
            };
            __decorate([
                index_1.LogMethodCall(index_1.LOG_LEVEL.DEBUG, true, "Hey"),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], MyClass.prototype, "doSomething", null);
            MyClass = __decorate([
                index_1.Logging("facility", {
                    logger: mock.logger,
                    level: index_1.LOG_LEVEL.DEBUG
                })
            ], MyClass);
            return MyClass;
        }());
        var myObj = new MyClass();
        expect(myObj.doSomething("hello", "world")).toEqual(true);
        expect(mock.target.log).toHaveBeenCalled();
    });
    it("Logging and LogMethodCall decorator should work with zero configuration", function () {
        var mock = mockLoggerWithTarget();
        var MyClass = /** @class */ (function () {
            function MyClass() {
            }
            MyClass.prototype.doSomething = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return true;
            };
            __decorate([
                index_1.LogMethodCall(),
                __metadata("design:type", Function),
                __metadata("design:paramtypes", [Object]),
                __metadata("design:returntype", void 0)
            ], MyClass.prototype, "doSomething", null);
            MyClass = __decorate([
                index_1.Logging(null, {
                    logger: mock.logger
                })
            ], MyClass);
            return MyClass;
        }());
        var myObj = new MyClass();
        expect(myObj.doSomething("hello", "world")).toEqual(true);
        expect(mock.target.log).toHaveBeenCalled();
    });
});
//# sourceMappingURL=testUtil.js.map