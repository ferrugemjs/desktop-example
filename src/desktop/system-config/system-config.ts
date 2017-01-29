import {IEventSubscribe,EventEmitter} from "event-emitter-lite";

import dispatchBus from "../global/dispatch-bus";

interface IImgResource{
	desc:string;
	path:string;
}

export class SystemConfig{
	private visible:boolean;
	private onChangeBackground:EventEmitter<string>=new EventEmitter();
	private indxImg:number;
	private imgs:IImgResource[];
	private refresh:Function;
	constructor(){
		this.visible = true;
		let baseUrl:string = "dist/desktop/init-app/assets/img/";
		this.imgs = [
			{desc:"default",path:baseUrl+"dotted_bg-min.png"}
			,{desc:"gray-min-image",path:baseUrl+"gray-background-image-min.jpg"}
			,{desc:"gray-image",path:baseUrl+"gray-background-image.jpg"}
			,{desc:"green-image",path:baseUrl+"green-background-image.jpg"}
			,{desc:"ttpat-background",path:baseUrl+"ttpat-min.jpg"}
		];
		this.indxImg = 0;
	}
	private submitBackgroundImage():void{
		this.onChangeBackground.emit(this.imgs[this.indxImg].path);
		dispatchBus.dispatch.emit({
			action:'change:background-img'
			,data:this.imgs[this.indxImg].path
		});
		this.close();
	}
	private close():void{
		this.visible=false;
		this.refresh();
	}
}