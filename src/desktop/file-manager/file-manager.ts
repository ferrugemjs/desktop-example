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
	private fileSearch:string;
	constructor(){
		this.baseUrl = "example";
		this.actualUrl = this.baseUrl;
		this.isOpen = true;
		this.fileSearch = "";
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
		if(this.fileSearch){
			return fileTypeStore.get().filter((file_item)=>{
				return file_item.name.indexOf(this.fileSearch) > -1;
			});	
		}
		return fileTypeStore.get();		
	}

	private get folders():IFolderType[]{
		if(this.fileSearch){
			return folderTypeStore.get().filter((folder_item)=>{
				return folder_item.name.indexOf(this.fileSearch) > -1;
			});	
		}	
		return folderTypeStore.get();
	}
	private setDirectory(directoryindex:number):void{
		if(directoryindex > 0){
			let fileDirectory:string = "";
			let fileArray:string[] = this.actualUrl.split("/");
			for(let i=0;i < directoryindex+1;i++){
				if(fileArray[i]){
					fileDirectory += fileArray[i]+"/";
				}
			};
			this.actualUrl = fileDirectory;
		}else{
			this.actualUrl = this.baseUrl;
		};
		fileManagerDispatch.dispatchChangeDir.emit(this.actualUrl);
	}
}