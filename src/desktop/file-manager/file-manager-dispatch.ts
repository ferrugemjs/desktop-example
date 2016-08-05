import {EventEmitter} from "event-emitter-lite";

class FileManagerDispatch{
	dispatchCloser:EventEmitter<boolean> = new EventEmitter();
	dispatchChangeDir:EventEmitter<string> = new EventEmitter();
	constructor(){
		
	}
}

export default new FileManagerDispatch();