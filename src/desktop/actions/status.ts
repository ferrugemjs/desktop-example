import {EventEmitter} from "event-emitter-lite";
import {EStatusRequest} from "../status-bar/status-request-enum";

export const displayRequestStatus:EventEmitter<EStatusRequest> = new EventEmitter<EStatusRequest>();