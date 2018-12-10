import { LOG_LEVEL, ILoggerTarget, ILoggerMetaData } from "./interfaces";
/**
 * Base logger target options
 */
export interface IBaseTargetOptions {
    /** Max log level */
    level?: LOG_LEVEL;
    /** Facilities - null for all */
    facilities?: Array<string>;
    /** If to include timestamp */
    timestamp?: boolean;
}
/**
 * Logger base target class
 */
export declare abstract class BaseTarget implements ILoggerTarget {
    protected level: LOG_LEVEL;
    protected facilities: Array<string>;
    protected timestamp: boolean;
    protected levelLabels: {};
    /**
     * Base logger target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new BaseTarget({
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ]
     * }));
     * ```
     *
     * @param options Target options
     */
    constructor(options: IBaseTargetOptions);
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
     * Log message
     *
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     * @param meta Meta data
     */
    log(level: LOG_LEVEL, facility: string, args: Array<any>, meta: ILoggerMetaData): void;
    /**
     * Write formatted log message - should be overriden, not implemented (does nothing)
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     * @param meta Meta-data
     */
    protected write(level: LOG_LEVEL, facility: string, msg: Array<string>, meta: ILoggerMetaData): void;
    /**
     * Close all I/O handles - should be overriden, not implemented (does nothing)
     */
    close(): void;
}
