import Gelf = require("gelf");
import { LOG_LEVEL, ILoggerMetaData } from "./interfaces";
import { BaseTarget, IBaseTargetOptions } from "./BaseTarget";
/**
 * GreyLog (GELF) target options
 */
export interface IGraylogTargetOptions extends IBaseTargetOptions {
    /** GrayLog server port, default 12201 */
    graylogPort?: number;
    /** GrayLog server hostname */
    graylogHostname: string;
    /** Connection type: 'lan' or 'wan', default 'lan' */
    connection?: string;
    /** Max chunk size for WAN type, default 1420 */
    maxChunkSizeWan?: number;
    /** Max chunk size for LAN type, default 8154 */
    maxChunkSizeLan?: number;
    /** Host (application) identifier, default '_unspecified_' */
    host?: string;
    /** GELF protocol version, default '1.0' */
    version?: string;
    /** Facility prefix string */
    facilityPrefix?: string;
    /** If to log debug messages to stdout */
    debugGelfClient?: boolean;
    /** Additional static message fields */
    additionalFields?: {
        [K: string]: string | number;
    };
    /** Transport type: 'GELF' or 'TCP', default 'GELF' */
    transport?: string;
}
/**
 * GrayLog (GELF) target class
 */
export declare class GraylogTarget extends BaseTarget {
    protected version: string;
    protected host: string;
    protected transport: string;
    protected graylogHostname: string;
    protected graylogPort: number;
    protected facilityPrefix: string;
    protected additionalFields: {
        [K: string]: string | number;
    };
    protected debug: boolean;
    readonly logLevelMap: {
        [K: number]: number;
    };
    /** Gelf instance */
    protected gelf: Gelf;
    /**
     * GrayLog target constructor
     *
     * Usage:
     *
     * ```
     * logger.to("someUniqueTargetId", new GraylogTarget({
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
     * 	transport: "GELF",
     * 	additionalFields: {
     * 		myField: "myValue"
     * 	},
     * 	debugGelfClient: true
     * }));
     * ```
     *
     * @param options Target options
     */
    constructor(options: IGraylogTargetOptions);
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
     * Send message to GrayLog server
     *
     * @param level Log level
     * @param facility Facility
     * @param msg Formated message parts
     */
    protected send(payload: any): void;
    /**
     * Close socket handle
     */
    close(): void;
}
