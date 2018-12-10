import { LOG_LEVEL, ILoggerMetaData } from "./interfaces";
import { FileTarget } from "./FileTarget";
/**
 * JSON target class
 */
export declare class JsonFileTarget extends FileTarget {
    /**
     * Opens file handle to log file
     */
    protected init(): void;
    /**
     * Log message
     *
     * @param level Log level
     * @param facility Facility
     * @param args Message arguments
     * @param meta Meta-data
     */
    log(level: LOG_LEVEL, facility: string, args: Array<any>, meta: ILoggerMetaData): void;
    /**
     * Write log message
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Message object
     */
    protected write(level: LOG_LEVEL, facility: string, message: Array<any>, meta: ILoggerMetaData): void;
    /**
     * Close I/O handle
     */
    close(): void;
}
