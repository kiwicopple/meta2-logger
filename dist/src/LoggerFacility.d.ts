import { ILogger, LOG_LEVEL } from "./interfaces";
import { Logger } from "./Logger";
/**
 * Logger facility configuration
 */
export interface ILoggerFacilityConfig {
    level?: LOG_LEVEL;
}
/**
 * Facility class
 */
export declare class LoggerFacility implements ILogger {
    protected logger: Logger;
    protected prefix: string;
    /** Facility log level */
    protected level: LOG_LEVEL;
    /**
     * Facility constructor
     *
     * @param logger Logger instance
     * @param prefix Facility name
     * @param config Facility configuration
     */
    constructor(logger: Logger, prefix: string, config?: ILoggerFacilityConfig);
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
     * Internal log method that pass log message to parent logger - DO NOT USE DIRECTLY!
     *
     * @internal
     * @param level Log level
     * @param args Message arguments
     */
    _log(level: LOG_LEVEL, args: any): void;
    /**
     * Logs message - first argument MUST be log level (from enum = number)
     *
     * Arguments are formatted the same way as the standard console.log() function does.
     *
     * Usage:
     * ```
     * facility.log(LOG_LEVEL.INFO, "Formatted %s message, code %d", "info", 123);
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
     * facility.debug("Formatted %s message, code %d", "debug", 123);
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
     * facility.info("Formatted %s message, code %d", "info", 123);
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
     * facility.notice("Formatted %s message, code %d", "notice", 123);
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
     * facility.warn("Formatted %s message, code %d", "warn", 123);
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
     * facility.warn("Formatted %s message, code %d", "warn", 123);
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
     * facility.error("Formatted %s message, code %d", "error", 123);
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
     * facility.crit("Formatted %s message, code %d", "critical", 123);
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
     * facility.alert("Formatted %s message, code %d", "alert", 123);
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
     * facility.emerg("Formatted %s message, code %d", "emergency", 123);
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
     * facility.panic("Formatted %s message, code %d", "emergency panic", 123);
     * ```
     *
     * @param args Message arguments
     */
    panic(...args: any[]): void;
}
