import $xhr = require('promised-xhr');
$xhr.base = "";
import dispatchBus from "../global/dispatch-bus";

export class Main{
	private selectedBackgroundImage:string;
	private refresh:Function;
	constructor(){
		this.selectedBackgroundImage = "dist/desktop/init-app/assets/img/dotted_bg-min.png";
	}
	private attached(){
		dispatchBus.dispatch.subscribe(evt=>{
			console.log(evt);
			if(evt.action==="change:background-img"){
				this.changeBackgroundImage(evt.data);
			}
		});
	}
	private changeBackgroundImage(bckimg:string):void{
		this.selectedBackgroundImage = bckimg;
		//this.refresh();
		let tmp_element:any = document.getElementsByClassName("main-app")[0];
		tmp_element.style["background-image"] = "url('"+bckimg+"')";	
	}
}