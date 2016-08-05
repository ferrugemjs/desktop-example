import {EventEmitter} from "event-emitter-lite";
import {EStatusRequest} from "./status-request-enum";

class StatusBarDispatch{
	dispatchRequestStatus:EventEmitter<EStatusRequest> = new EventEmitter();
}

export default new StatusBarDispatch();