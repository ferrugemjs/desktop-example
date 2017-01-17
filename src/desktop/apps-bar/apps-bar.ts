import appsBarDispatch from "./apps-bar-dispatch";
import systemConfigDispatch from "../system-config/system-config-dispatch";
import {EventEmitter} from "event-emitter-lite";
import {IAppItem} from "../app/i-app";


export class AppsBar{
	public onHiddenApps:EventEmitter<boolean>=new EventEmitter();
	public onDispatchTask:EventEmitter<IAppItem>=new EventEmitter();
	private appsBarItens:IAppItem[];
	constructor(){
		this.appsBarItens = [
			{id:1,task:'file-manager',description:'a simple file manager',icon:'app-exprorer',path:'dist/desktop/file-manager/file-manager'}
			,{id:2,task:'config-sistem',description:'system options',icon:'app-config',path:'dist/desktop/system-config/system-config'}
		];
	}

	private hiddenApps(on:boolean){
		//appsBarDispatch.dispatchHidden.emit(on);
		this.onHiddenApps.emit(true);

	}
	private dispatchTask(appItem:IAppItem):void{
		this.onDispatchTask.emit(appItem);
		//systemConfigDispatch.dispatchCloser.emit(on);
	}
	private showManagerFiles():void{
		//console.log('abrindo file-manager!');
		appsBarDispatch.dispatchShowFileManager.emit(true);
	}
}