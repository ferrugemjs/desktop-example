import $xhr = require('promised-xhr');
import systemConfigDispatch from "../system-config/system-config-dispatch";
import {IAppItem} from "../app/i-app";

$xhr.base = "";

export class Main{
	private selectedBackgroundImage:string;
	private appsVisible:boolean;
	private apps:IAppItem[];
	constructor(){
		this.selectedBackgroundImage = "dotted_bg-min.png";
		this.appsVisible = false;
		this.apps = [];
	}
	private attached():void{
		//console.log("apenas um main!");
		//this.refresh();
		systemConfigDispatch.dispatchChangeBackgroundImage.subscribe((bckimg)=>{
			this.selectedBackgroundImage = bckimg;
			let element:any = document.getElementsByClassName("main-app")[0];
			element.style["background-image"] = "url('dist/desktop/main/assets/img/"+bckimg+"')";
			//(<any>this).refresh();

		});
	}
	private deatached():void{
		//console.log('eu fui removido?')
	}
	private hiddenApps(on:boolean):void{
		this.appsVisible = !this.appsVisible;
		
		console.log('hidden all apps',on);
		//this.refresh();
		
	}
	private loadApp(mod:IAppItem):void{
		console.log(mod);
		this.apps.push(mod);
		this.refresh();
	}
}