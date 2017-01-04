export class RadialProgressBar{
	private bgcolor:string;
	constructor(){
		this.bgcolor="black"
	}
	setBgcolor(color:string):void{
		console.log(`${this.bgcolor} to ${color}`);
		this.bgcolor = color;
	}
}