import {IFileType} from "./file-type-interface";

export class FileType implements IFileType{
	public name:string;
	public path:string;
	public extension:string;
	constructor(){
		this.name = "default name";
		this.extension = "";
	}
}