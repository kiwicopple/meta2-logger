import { LOG_LEVEL, ILoggerMetaData } from "./interfaces";
import { BaseTarget, IBaseTargetOptions } from "./BaseTarget";
/**
 * Console target options
 */
export interface IConsoleTargetOptions extends IBaseTargetOptions {
    /** If to print colors - works on unix-like systems */
    colorize?: boolean;
}
/**
 * Console target class
 */
export declare class ConsoleTarget extends BaseTarget {
    protected colorize: boolean;
    protected colors: any;
    /**
     * Console target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new ConsoleTarget({
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * 	colorize: true
     * }));
     * ```
     *
     * @param options Target options
     */
    constructor(options: IConsoleTargetOptions);
    /**
     * Write formatted log message
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     * @param meta Meta-data
     */
    protected write(level: LOG_LEVEL, facility: string, message: Array<string>, meta: ILoggerMetaData): void;
}
