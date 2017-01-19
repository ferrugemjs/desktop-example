import {EventEmitter} from "event-emitter-lite";
import {IAppItem} from "../app/i-app";

class AppLauncherDispatch{
	public onDispatchTask:EventEmitter<IAppItem>=new EventEmitter();
}

export default new AppLauncherDispatch();