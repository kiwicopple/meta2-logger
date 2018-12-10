/// <reference types="node" />
import { EventEmitter } from "events";
import { LOG_LEVEL, ILoggerMetaData } from "./interfaces";
import { BaseTarget, IBaseTargetOptions } from "./BaseTarget";
/**
 * Memory target configuration options
 */
export interface IMemoryTargetOptions extends IBaseTargetOptions {
    limit?: number;
}
/**
 * Stored message interface
 */
export interface IMemoryTargetMessage {
    timestamp: number;
    level: LOG_LEVEL;
    facility: string;
    meta: ILoggerMetaData;
    message: string;
}
/**
 * Memory target class
 */
export declare class MemoryTarget extends BaseTarget {
    /** Message limit */
    protected limit: number;
    /** Stored messages */
    protected messages: Array<IMemoryTargetMessage>;
    /** Event emitter instance */
    readonly emitter: EventEmitter;
    /**
     * Memory logger target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new MemoryTarget({
     * 	level: LOG_LEVEL.DEBUG,
     * 	facilities: [ "server", "broker" ],
     *  limit: 1000
     * }));
     * ```
     *
     * @param options Target options
     */
    constructor(options: IMemoryTargetOptions);
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
     * Return stored messages
     */
    getMessages(): IMemoryTargetMessage[];
    /**
     * Remove all stored messages
     */
    clearMessages(): void;
}
