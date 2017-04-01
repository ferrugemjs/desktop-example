import {EventEmitter} from "event-emitter-lite";
import {IAppItem} from "../app/i-app";
import appLauncherDispatch from "../app-launcher/app-launcher-dispatch";

export class AppsBar{
	public onHiddenApps:EventEmitter<boolean>=new EventEmitter();
	constructor(){
	}
	private hiddenApps(on:boolean){
		this.onHiddenApps.emit(true);
	}
	private detached(){
		this.onHiddenApps.unsubscribeAll();
	}
}