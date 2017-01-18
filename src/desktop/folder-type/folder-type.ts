import {IFolderType} from "./folder-type-interface";
import folderTypeStore from "../folder-type/folder-type-store";
import {IEventSubscribe,EventEmitter} from "event-emitter-lite";

export class FolderType implements IFolderType{
	public name:string;
	public path:string;
	constructor(){
		this.path="";
		this.name = "";
	}
	private toFolder(){
		folderTypeStore.changeDir(this.path);
	}
}