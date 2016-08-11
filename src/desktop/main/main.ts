import $xhr = require('promised-xhr');
import systemConfigDispatch from "../system-config/system-config-dispatch";
import appsBarDispatch from "../apps-bar/apps-bar-dispatch";

$xhr.base = "";
/*
	<require from="base_app/main/assets/css/main.css!"></require>
	<require from="base_app/window/assets/css/window.css!"></require>
	<require from="base_app/folder-type/assets/css/folder-type.css!"></require>
	<require from="base_app/file-type/assets/css/file-type.css!"></require>
*/

export class Main{
	private selectedBackgroundImage:string;
	private showFileManager:boolean;
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
		appsBarDispatch.dispatchShowFileManager.once((show)=>{
			this.showFileManager = show;
			(<any>this).refresh();			
		});
	}
	private removed():void{
		//console.log('eu fui removido?')
	}
}