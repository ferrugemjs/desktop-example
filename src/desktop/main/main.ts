import $xhr = require('promised-xhr');
$xhr.base = "";

export class Main{
	private selectedBackgroundImage:string;
	constructor(){
		this.selectedBackgroundImage = "dist/desktop/main/assets/img/dotted_bg-min.png";
	}
	private changeBackgroundImage(bckimg:string):void{
		this.selectedBackgroundImage = bckimg;
		this.refresh();
		//let tmp_element:any = document.getElementsByClassName("main")[0];
		//tmp_element.style["background-image"] = "url('dist/desktop/main/assets/img/"+bckimg+"')";	
	}
}