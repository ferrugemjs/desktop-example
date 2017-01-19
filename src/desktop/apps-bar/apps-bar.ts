import {EventEmitter} from "event-emitter-lite";
import {IAppItem} from "../app/i-app";
import appLauncherDispatch from "../app-launcher/app-launcher-dispatch";

export class AppsBar{
	public onHiddenApps:EventEmitter<boolean>=new EventEmitter();
	private appsBarItens:IAppItem[];
	constructor(){
		this.appsBarItens = [
			{id:1,task:'file-manager',description:'a simple file manager',icon:'app-exprorer',path:'dist/desktop/file-manager/file-manager'}
			,{id:2,task:'config-sistem',description:'system options',icon:'app-config',path:'dist/desktop/system-config/system-config'}
		];
	}
	private hiddenApps(on:boolean){
		this.onHiddenApps.emit(true);
	}
	private dispatchTask(appItem:IAppItem):void{
		appLauncherDispatch.onDispatchTask.emit(appItem);
	}
}