import {EventEmitter} from "event-emitter-lite";

class DispatchBus{
	dispatch:EventEmitter<{action:string,data:any}> = new EventEmitter();
}

export default new DispatchBus();




