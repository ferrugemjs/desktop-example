import {IFileType} from "./file-type-interface"
export class FileType implements IFileType{
	public name:string;
	public path:string;
	constructor(){
		this.name = "default name";
	}
	private attached():void{}
	private setName(new_name:string):void{
		this.name = new_name;
		(<any>this).refresh();
	}
}