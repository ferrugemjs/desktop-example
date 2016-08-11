import {IFileType} from "../file-type/file-type-interface";
import {IFolderType} from "../folder-type/folder-type-interface";
import fileTypeStore from "../file-type/file-type-store";
import folderTypeStore from "../folder-type/folder-type-store";
import fileManagerDispatch from "./file-manager-dispatch";
import appsBarDispatch from "../apps-bar/apps-bar-dispatch";

export class FileManager{
	private baseUrl:string;
	private actualUrl:string;
	private isOpen:boolean;
	constructor(){
		this.baseUrl = "example";
		this.actualUrl = this.baseUrl;
		this.isOpen = true;
	}
	private attached():void{
		fileTypeStore.onChange.subscribe(()=>{
			(<any>this).refresh();
		});
		folderTypeStore.onChange.subscribe(()=>{
			(<any>this).refresh();
		});
		
		appsBarDispatch.dispatchHidden.subscribe((on)=>{
			this.isOpen = !on;
			if((<any>this).refresh){
				(<any>this).refresh();
			}
		});

		appsBarDispatch.dispatchShowFileManager.subscribe((on)=>{
			this.isOpen = on;
			if((<any>this).refresh){
				(<any>this).refresh();
			}
		});
		

		fileManagerDispatch.dispatchChangeDir.subscribe((new_dir)=>{
			this.actualUrl = new_dir;
		});
		
	}

	private get files():IFileType[]{
		//return [];
		//console.log(fileTypeStore.get());
		return fileTypeStore.get();		
	}

	private get folders():IFolderType[]{
		//return [];
		return folderTypeStore.get();
	}
}