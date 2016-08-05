import $xhr = require('promised-xhr');
import systemConfigDispatch from "../system-config/system-config-dispatch";

$xhr.base = "";
/*
	<require from="base_app/main/assets/css/main.css!"></require>
	<require from="base_app/window/assets/css/window.css!"></require>
	<require from="base_app/folder-type/assets/css/folder-type.css!"></require>
	<require from="base_app/file-type/assets/css/file-type.css!"></require>
*/

export class Main{
	private selectedTheme:string;
	constructor(){
		this.selectedTheme = "gray-theme";
	}
	private attached():void{
		//console.log("apenas um main!");
		//this.refresh();
		systemConfigDispatch.dispatchChangeTheme.subscribe((theme)=>{
			this.selectedTheme = theme;
			(<any>this).refresh();
		});
	}
	private removed():void{
		//console.log('eu fui removido?')
	}
}