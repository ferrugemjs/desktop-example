import systemConfigDispatch from "./system-config-dispatch";
import appsBarDispatch from "../apps-bar/apps-bar-dispatch";
import {IEventSubscribe} from "event-emitter-lite";

export class SystemConfig{
	private isOpen:boolean=false;
	private subscribeConfigDispatch:IEventSubscribe;
	private attached():void{
		this.subscribeConfigDispatch = systemConfigDispatch.dispatchCloser.subscribe((on)=>{
			this.isOpen = on;
			(<any>this).refresh();
		});
	}
	private setBackgroundImage(bckimg:string):void{
		systemConfigDispatch.dispatchCloser.unsubscribe(this.subscribeConfigDispatch);	
		systemConfigDispatch.dispatchChangeBackgroundImage.emit(bckimg);
	}
}