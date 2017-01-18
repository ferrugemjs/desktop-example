import {IEventSubscribe,EventEmitter} from "event-emitter-lite";

export class SystemConfig{
	private isOpen:boolean;
	private onChangeBackground:EventEmitter<string>=new EventEmitter();
	private backImg:string;
	constructor(){
		this.isOpen = true;
		this.backImg = "dotted_bg-min.png";
	}
	private submitBackgroundImage():void{
		this.isOpen = false;
		this.onChangeBackground.emit(this.backImg);
	}
}