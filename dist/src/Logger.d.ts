import { ILogger, ILoggerTarget, LOG_LEVEL } from "./interfaces";
import { LoggerFacility, ILoggerFacilityConfig } from "./LoggerFacility";
import { IConsoleTargetOptions } from "./ConsoleTarget";
import { IMemoryTargetOptions } from "./MemoryTarget";
import { IFileTargetOptions } from "./FileTarget";
import { IGraylogTargetOptions } from "./GraylogTarget";
/**
 * Logger configuration
 */
export interface ILoggerConfig {
    level?: LOG_LEVEL;
    trace?: boolean;
}
/**
 * Logger class
 */
export declare class Logger implements ILogger {
    /** Logging targets */
    protected targets: {
        [K: string]: ILoggerTarget;
    };
    /** Facility registry */
    protected facilities: {
        [K: string]: LoggerFacility;
    };
    /** Logger log level */
    protected level: LOG_LEVEL;
    /** If to include callstack */
    protected trace: boolean;
    /**
     * Logger constructor
     *
     * @param config Logger configuration
     */
    constructor(config?: ILoggerConfig);
    /**
     * Sets log level
     *
     * @param level New log level
     */
    setLevel(level: LOG_LEVEL): void;
    /**
     * Returns log level
     */
    getLevel(): LOG_LEVEL;
    /**
     * Enabled or disabled storing of callstacks
     *
     * @param enabled Enable state
     */
    enableTrace(enabled?: boolean): void;
    /**
     * Return is tracing is enabled
     */
    isTraceEnabled(): boolean;
    /**
     * Capture, filter and return log message stack trace
     */
    captureStackTrace(prefix?: string): any;
    /**
     * Internal log method that pass log message to all targets - DO NOT USE DIRECTLY!
     *
     * @internal
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     */
    _log(level: LOG_LEVEL, facility: string, args: any): void;
    /**
     * Logs message - first argument MUST be log level (from enum = number)
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.log(LOG_LEVEL.INFO, "Formatted %s message, code %d", "info", 123);
     * ```
     *
     * @param args Message arguments
     */
    log(...args: any[]): void;
    /**
     * Log DEBUG level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.debug("Formatted %s message, code %d", "debug", 123);
     * ```
     *
     * @param args Message arguments
     */
    debug(...args: any[]): void;
    /**
     * Log INFO level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.info("Formatted %s message, code %d", "info", 123);
     * ```
     *
     * @param args Message arguments
     */
    info(...args: any[]): void;
    /**
     * Log NOTICE level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.notice("Formatted %s message, code %d", "notice", 123);
     * ```
     *
     * @param args Message arguments
     */
    notice(...args: any[]): void;
    /**
     * Log WARN level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.warn("Formatted %s message, code %d", "warn", 123);
     * ```
     *
     * @param args Message arguments
     */
    warn(...args: any[]): void;
    /**
     * Log WARN level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.warning("Formatted %s message, code %d", "warn", 123);
     * ```
     *
     * @param args Message arguments
     */
    warning(...args: any[]): void;
    /**
     * Log ERROR level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.error("Formatted %s message, code %d", "error", 123);
     * ```
     *
     * @param args Message arguments
     */
    error(...args: any[]): void;
    /**
     * Log CRITICAL level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.crit("Formatted %s message, code %d", "critical", 123);
     * ```
     *
     * @param args Message arguments
     */
    crit(...args: any[]): void;
    /**
     * Log ALERT level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.alert("Formatted %s message, code %d", "alert", 123);
     * ```
     *
     * @param args Message arguments
     */
    alert(...args: any[]): void;
    /**
     * Log EMERGENCY level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.emerg("Formatted %s message, code %d", "emergency", 123);
     * ```
     *
     * @param args Message arguments
     */
    emerg(...args: any[]): void;
    /**
     * Log EMERGENCY level message
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * logger.panic("Formatted %s message, code %d", "emergency panic", 123);
     * ```
     *
     * @param args Message arguments
     */
    panic(...args: any[]): void;
    /**
     * Create facility logger wrapper
     *
     * @param name Facility name
     * @param config Facility configuration
     */
    facility(name: string, config?: ILoggerFacilityConfig): LoggerFacility;
    /**
     * Return registered facilities
     */
    getAllFacilities(): {
        [K: string]: LoggerFacility;
    };
    /**
     * Add logging target
     *
     * @param id Target unique ID
     * @param target Target instance
     */
    to(id: string, target: ILoggerTarget): this;
    /**
     * Return all assigned logging targets
     */
    getAllTargets(): {
        [K: string]: ILoggerTarget;
    };
    /**
     * Return target by ID
     *
     * @param id Logging target ID
     */
    getTarget(id: string): ILoggerTarget;
    /**
     * Add console target
     *
     * Overrides existings console target defined previously by this method.
     *
     * Usage:
     *
     * ```
     * logger.toConsole({
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * 	colorize: true
     * });
     * ```
     *
     * @param options Target options
     */
    toConsole(options?: IConsoleTargetOptions): this;
    /**
     * Add memory target
     *
     * Overrides existings memory target defined previously by this method.
     *
     * Usage:
     *
     * ```
     * logger.toMemory({
     * 	level: LOG_LEVEL.DEBUG,
     * 	limit: 1000
     * });
     *
     * logger.getTarget("__memory__").getMessages();
     * ```
     *
     * @param options Target options
     */
    toMemory(options?: IMemoryTargetOptions): this;
    /**
     * Add file target
     *
     * Usage:
     *
     * ```
     * logger.toFile("myLogFile.log", {
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * });
     * ```
     *
     * @param filename Log filename
     * @param options Target options
     */
    toFile(filename: string, options?: IFileTargetOptions): this;
    /**
     * Add JSON file target
     *
     * Usage:
     *
     * ```
     * logger.toJsonFile("myLogFile.json", {
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * });
     * ```
     *
     * @param filename Log filename
     * @param options Target options
     */
    toJsonFile(filename: string, options?: IFileTargetOptions): this;
    /**
     * Add GrayLog (GELF) target
     *
     * Overrides existings grayLog target defined previously by this method. Use `logger.to()` method to define
     * multiple GrayLog targets.
     *
     * Usage:
     *
     * ```
     * logger.toGrayLog({
     * 	level: LOG_LEVEL.DEBUG,
     * 	facilities: [ "server", "broker" ],
     * 	graylogHostname: "localhost",
     * 	graylogPort: 12201,
     * 	connection: "lan",
     * 	maxChunkSizeWan: 1420,
     * 	maxChunkSizeLan: 8154,
     * 	host: "myApp",
     * 	facilityPrefix: "myAppPrefix_",
     * 	version: "1.0",
     * 	additionalFields: {
     * 		myField: "myValue"
     * 	},
     * 	debugGelfClient: true
     * });
     * ```
     *
     * @param options Target options
     */
    toGrayLog(options: IGraylogTargetOptions): this;
    /**
     * Close I/O handles of all targets
     */
    close(): void;
}
