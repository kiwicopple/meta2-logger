import { Logger } from "./Logger";
export * from "./interfaces";
export * from "./util";
export * from "./Logger";
export * from "./LoggerFacility";
export * from "./BaseTarget";
export * from "./ConsoleTarget";
export * from "./MemoryTarget";
export * from "./FileTarget";
export * from "./JsonFileTarget";
export * from "./GraylogTarget";
declare const globalInstance: Logger;
export default globalInstance;
