import {EventEmitter} from "event-emitter-lite";

class FileManagerDispatch{
	dispatchCloser:EventEmitter<boolean> = new EventEmitter();
	dispatchChangeDir:EventEmitter<string> = new EventEmitter();
}

export default new FileManagerDispatch();