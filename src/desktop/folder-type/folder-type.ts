import {IFolderType} from "./folder-type-interface";
import folderTypeStore from "../folder-type/folder-type-store";
import fileManagerDispatch from "../file-manager/file-manager-dispatch";


export class FolderType implements IFolderType{
	public name:string;
	public path:string;
	constructor(){
		this.name = "";
	}
	private setName(name:string):void{
		this.name = name;
		(<any>this).refresh();
	}
	private toFolder(){
		fileManagerDispatch.dispatchChangeDir.emit(this.path);
	}
}