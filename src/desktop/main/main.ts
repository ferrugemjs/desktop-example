import $xhr = require('promised-xhr');
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
	private attached():void{}
	private changeBackgroundImage(bckimg:string):void{
		this.selectedBackgroundImage = bckimg;
		this.refresh();
		//let tmp_element:any = document.getElementsByClassName("main")[0];
		//tmp_element.style["background-image"] = "url('dist/desktop/main/assets/img/"+bckimg+"')";	
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
		this.appsVisible = true;
		this.apps.push(mod);
		this.refresh();
	}
}