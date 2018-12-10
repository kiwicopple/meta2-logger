import { Logger, ILoggerFacilityConfig, ILogger, LOG_LEVEL } from "./index";
/**
 * Parse log level from string to LOG_LEVEL enum value
 *
 * @param level Log level
 */
export declare function parseLogLevel(level: string): any;
/**
 * Logging decorator options
 */
export interface ILoggingDecoratorOptions extends ILoggerFacilityConfig {
    logger?: Logger;
}
/**
 * Logging decorator
 *
 * Assigns logger facility as `log` property.
 * Note: experimentalDecorators must be enabled
 *
 * @param constructor Class
 * @param facility Facility name
 * @param opts Facility options
 */
export declare function Logging<T extends {
    new (...args: any[]): any;
}>(facility?: string, opts?: ILoggingDecoratorOptions): (target: T) => {
    new (...args: any[]): {
        [x: string]: any;
        log: ILogger;
    };
} & T;
/**
 * Log method call decorator
 *
 * Traces method call
 *
 * @param level Log level
 * @param captureArgs If to capture arguments
 * @param prefix Log message prefix
 */
export declare function LogMethodCall(level?: LOG_LEVEL, captureArgs?: boolean, prefix?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
