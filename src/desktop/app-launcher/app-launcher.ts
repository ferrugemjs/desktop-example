import {IAppItem} from "../app/i-app";
import {EventEmitter,IEventSubscribe} from "event-emitter-lite";
import appLauncherDispatch from "./app-launcher-dispatch";

export class AppLouncher{
	private _apps:IAppItem[];
	private refresh:Function;
	private inscDispatch:IEventSubscribe;
	constructor(){
		this._apps = [];
	}
	private get apps(){
		return this._apps.filter(app=>app.visible);
	}
	private detached():void{
		appLauncherDispatch.onDispatchTask.unsubscribe(this.inscDispatch);
	}
	private attached():void{
		this.inscDispatch = appLauncherDispatch.onDispatchTask.subscribe(app=>this.loadApp(app));
	}
	private loadApp(pmod:IAppItem):void{
		let item = this.apps.filter(mod=>pmod.task == mod.task);
		console.log(this.apps);
		if(item.length){
			item[0].visible = true;		
		}else{
			pmod.visible = true;
			pmod.pid = this._apps.length;
			this._apps.push(pmod);	
		}	
		this.refresh();
	}
	private hiddenApp(pid:number):void{
		console.log(pid);
		this._apps.some(app=>{
			if(app.pid==pid){
				app.visible=false;
				return true;
			}
			return false;
		})
	}
	private hiddenApps(on:boolean):void{		
		console.log('hidden all apps',on);
		this._apps.forEach(app=>{
			app.visible = false;
		});
		this.refresh();		
	}
}