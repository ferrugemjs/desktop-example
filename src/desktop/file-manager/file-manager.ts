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
		//this.baseUrl = "..";
		this.actualUrl = this.baseUrl;
		this.isOpen = false;
		this.fileSearch = "";
	}
	private detached():void{
		console.log('removido!!!');
	}
	private attached():void{
		fileTypeStore.onChange.subscribe(()=>{
			//console.log(fileTypeStore.get());
			(<any>this).refresh();
		});
		folderTypeStore.onChange.subscribe(()=>{
			//console.log(folderTypeStore.get());
			(<any>this).refresh();
		});
		
		appsBarDispatch.dispatchHidden.subscribe((on)=>{
			this.isOpen = !on;
			if((<any>this).refresh){
				(<any>this).refresh();
			}
		});

		appsBarDispatch.dispatchShowFileManager.subscribe((on)=>{
			//console.log('ops!');
			this.isOpen = on;
			if((<any>this).refresh){
				(<any>this).refresh();
			}
		});
		

		fileManagerDispatch.dispatchChangeDir.subscribe((new_dir)=>{
			//console.log(new_dir);
			this.actualUrl = new_dir;
		});
		
	}
	private get files():IFileType[]{
		if(this.fileSearch){
			const filterBySearch = (file_item:IFileType) => file_item.name.indexOf(this.fileSearch) > -1;
			return fileTypeStore.get().filter(filterBySearch);
		}
		return fileTypeStore.get();		
	}

	private get folders():IFolderType[]{
		if(this.fileSearch){
			const filterBySearch = (folder_item:IFolderType) => folder_item.name.indexOf(this.fileSearch) > -1;
			return folderTypeStore.get().filter(filterBySearch);	
		}
		return folderTypeStore.get();
	}
	private setDirectory(directoryindex:number):void{
		//console.log(directoryindex);
		if(directoryindex > 0){
			let fileDirectory:string = "";
			let fileArray:string[] = this.actualUrl.split("/");
			//console.log(directoryindex,fileArray.length);
			if(directoryindex+1 < fileArray.length){			
				for(let i=0;i < directoryindex+1;i++){
					if(fileArray[i]){
						fileDirectory += fileArray[i]+"/";
					}
				};
				this.actualUrl = fileDirectory.substring(0,fileDirectory.length-1);
				fileManagerDispatch.dispatchChangeDir.emit(this.actualUrl);
			}
		}else{
			this.actualUrl = this.baseUrl;
			fileManagerDispatch.dispatchChangeDir.emit(this.actualUrl);
		};
		
	}
}