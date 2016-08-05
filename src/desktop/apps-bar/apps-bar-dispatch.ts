import {EventEmitter} from "event-emitter-lite";

class AppsBarDispatch{
	dispatchHidden:EventEmitter<boolean> = new EventEmitter();
}

export default new AppsBarDispatch();