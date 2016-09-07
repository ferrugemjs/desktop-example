import $xhr = require('promised-xhr');
import systemConfigDispatch from "../system-config/system-config-dispatch";

$xhr.base = "";

export class Main{
	private selectedBackgroundImage:string;
	constructor(){
		this.selectedBackgroundImage = "dotted_bg-min.png";
	}
	private attached():void{
		//console.log("apenas um main!");
		//this.refresh();
		systemConfigDispatch.dispatchChangeBackgroundImage.subscribe((bckimg)=>{
			this.selectedBackgroundImage = bckimg;
			(<any>this).refresh();
		});
	}
	private deatached():void{
		//console.log('eu fui removido?')
	}
}