/**
 * Log levels
 */
export declare enum LOG_LEVEL {
    DEBUG = 7,
    INFO = 6,
    NOTICE = 5,
    WARN = 4,
    ERROR = 3,
    CRITICAL = 2,
    ALERT = 1,
    EMERGENCY = 0
}
/**
 * String to log level mapping
 */
export declare const LOG_LEVEL_NAME_MAP: {
    debug: LOG_LEVEL;
    info: LOG_LEVEL;
    notice: LOG_LEVEL;
    warn: LOG_LEVEL;
    warning: LOG_LEVEL;
    error: LOG_LEVEL;
    critical: LOG_LEVEL;
    crit: LOG_LEVEL;
    alert: LOG_LEVEL;
    emergency: LOG_LEVEL;
    emerg: LOG_LEVEL;
    panic: LOG_LEVEL;
};
/**
 * Log level to string mapping
 */
export declare const LOG_LEVEL_NAME_MAP_INV: {};
/**
 * Logger interface
 */
export interface ILogger {
    log(...args: any[]): any;
    debug(...args: any[]): any;
    info(...args: any[]): any;
    notice(...args: any[]): any;
    warn(...args: any[]): any;
    warning(...args: any[]): any;
    error(...args: any[]): any;
    crit(...args: any[]): any;
    alert(...args: any[]): any;
    emerg(...args: any[]): any;
    panic(...args: any[]): any;
    getLevel(): LOG_LEVEL;
    setLevel(level: LOG_LEVEL): any;
}
export interface ILoggerMetaData {
    [K: string]: string | number | boolean | Date;
    [K: number]: string | number | boolean | Date;
}
/**
 * Logger target interface
 */
export interface ILoggerTarget {
    log: (level: LOG_LEVEL, facility: string, args: Array<any>, meta: ILoggerMetaData) => void;
    close: () => void;
    getLevel(): LOG_LEVEL;
    setLevel(level: LOG_LEVEL): any;
}
