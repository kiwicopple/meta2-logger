import { LOG_LEVEL, ILoggerMetaData } from "./interfaces";
import { BaseTarget, IBaseTargetOptions } from "./BaseTarget";
/**
 * File target options
 */
export interface IFileTargetOptions extends IBaseTargetOptions {
}
/**
 * File target class
 */
export declare class FileTarget extends BaseTarget {
    protected filename: string;
    protected fd: any;
    protected initialized: boolean;
    /**
     * File target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new FileTarget("myLogFile.log", {
     * 	level: LOG_LEVEL.DEBUG,
     * 	timestamp: true,
     * 	facilities: [ "server", "broker" ],
     * }));
     * ```
     *
     * @param filename Log filename
     * @param options Target options
     */
    constructor(filename: string, options: IFileTargetOptions);
    /**
     * Opens file handle to log file
     */
    protected init(): void;
    /**
     * Write formatted log message
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     * @param meta Meta-data
     */
    protected write(level: LOG_LEVEL, facility: string, message: Array<string>, meta: ILoggerMetaData): void;
    /**
     * Close I/O handle
     */
    close(): void;
}
