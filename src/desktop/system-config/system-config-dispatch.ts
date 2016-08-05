import {EventEmitter} from "event-emitter-lite";

class SystemConfigDispatch{
	dispatchCloser:EventEmitter<boolean> = new EventEmitter();
	dispatchChangeTheme:EventEmitter<string> = new EventEmitter();
}

export default new SystemConfigDispatch();