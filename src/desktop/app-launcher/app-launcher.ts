import {IAppItem} from "../app/i-app";
import {EventEmitter} from "event-emitter-lite";
import appLauncherDispatch from "./app-launcher-dispatch";

export class AppLouncher{
	private _apps:IAppItem[];
	private refresh:Function;
	constructor(){
		this._apps = [];
	}
	private get apps(){
		return this._apps.filter(app=>app.visible);
	}
	private attached():void{
		appLauncherDispatch.onDispatchTask.subscribe(app=>this.loadApp(app));
	}
	private loadApp(mod:IAppItem):void{

		let tm:number = this.apps.filter(modi=>modi.task === mod.task).length;
		if(tm===0){
			mod.visible = true;
			this._apps.push(mod);			
		}else{
			this._apps.filter(modi=>modi.task === mod.task).forEach(modi=>{
				modi.visible = true;
			})
		}	
		this.refresh();
	}
	private hiddenApps(on:boolean):void{		
		console.log('hidden all apps',on);
		this._apps.forEach(app=>{
			if(app.detached){
				app.detached();
			}
		});
		this._apps = [];
		this.refresh();		
	}
}