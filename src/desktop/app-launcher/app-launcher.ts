import {IAppItem} from "../app/i-app";
import {EventEmitter} from "event-emitter-lite";
import appLauncherDispatch from "./app-launcher-dispatch";

export class AppLouncher{
	private apps:IAppItem[];
	constructor(){
		this.apps = [];
	}
	private attached():void{
		appLauncherDispatch.onDispatchTask.subscribe(app=>this.loadApp(app));
	}
	private loadApp(mod:IAppItem):void{
		this.apps.push(mod);
		this.refresh();
	}
	private hiddenApps(on:boolean):void{		
		console.log('hidden all apps',on);
		this.apps.forEach(app=>{
			if(app.detached){
				app.detached();
			}
		});
		this.apps = [];
		this.refresh();		
	}
}