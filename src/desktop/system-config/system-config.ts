import systemConfigDispatch from "./system-config-dispatch";
import appsBarDispatch from "../apps-bar/apps-bar-dispatch";
import {IEventSubscribe,EventEmitter} from "event-emitter-lite";

export class SystemConfig{
	private isOpen:boolean;
	private subscribeConfigDispatch:IEventSubscribe;
	private onChangeBackground:EventEmitter<string>=new EventEmitter();
	private attached():void{
		this.isOpen = true;
		/*
		this.subscribeConfigDispatch = systemConfigDispatch.dispatchCloser.subscribe((on)=>{
			this.isOpen = on;
			(<any>this).refresh();
		});
		*/
	}
	private setBackgroundImage(bckimg:string):void{
		this.onChangeBackground.emit(bckimg);
		systemConfigDispatch.dispatchCloser.unsubscribe(this.subscribeConfigDispatch);	
		systemConfigDispatch.dispatchChangeBackgroundImage.emit(bckimg);
	}
}