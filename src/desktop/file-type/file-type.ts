import {IFileType} from "./file-type-interface";

export class FileType implements IFileType{
	public name:string;
	public path:string;
	public extension:string;
	constructor(){
		this.name = "default name";
		this.extension = "";
	}
	private attached():void{}

	private setExtension(new_ext:string):void{
		//console.log(new_ext);
		this.extension = new_ext;
		(<any>this).refresh();
	}
}