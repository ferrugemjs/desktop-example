import {IFolderType} from "./folder-type-interface";
import folderTypeStore from "../folder-type/folder-type-store";
import fileManagerDispatch from "../file-manager/file-manager-dispatch";


export class FolderType implements IFolderType{
	public name:string;
	public path:string;
	constructor(){
		this.path="";
		this.name = "";
	}
	private setName(name:string):void{
		console.log(`${this.name} para ${name}`);
		this.name = name;
		(<any>this).refresh();
	}
	private setPath(path:string):void{
		console.log(`${this.path} para ${path}`);
		this.path = path;
		(<any>this).refresh();
	}
	private toFolder(){
		fileManagerDispatch.dispatchChangeDir.emit(this.path);
	}
}