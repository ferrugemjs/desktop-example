import appsBarDispatch from "./apps-bar-dispatch";
import systemConfigDispatch from "../system-config/system-config-dispatch";

export class AppsBar{
	private hiddenApps(on:boolean){
		appsBarDispatch.dispatchHidden.emit(on);
	}
	private toogleShowConfig(on:boolean):void{
		systemConfigDispatch.dispatchCloser.emit(on);
	}
	private showManagerFiles():void{
		console.log('abrindo file-manager!');
		appsBarDispatch.dispatchShowFileManager.emit(true);
	}
}