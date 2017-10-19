import {EventEmitter} from "event-emitter-lite";
import {IAppItem} from "../interfaces/i-app";

export const dispatchTask:EventEmitter<IAppItem> = new EventEmitter();