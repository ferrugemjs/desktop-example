import {IFileType} from "../file-type/file-type-interface";
import {IFolderType} from "../folder-type/folder-type-interface";
import fileTypeStore from "../file-type/file-type-store";
import folderTypeStore from "../folder-type/folder-type-store";
import {IEventSubscribe,EventEmitter} from "event-emitter-lite";

export class FileManager{
	private baseUrl:string;
	private actualUrl:string;
	private isOpen:boolean;
	private fileSearch:string;
	private inSearch:boolean;
	public onChangeDir:EventEmitter<string> = new EventEmitter();
	constructor(){
		this.baseUrl = "example";
		//this.baseUrl = "..";
		this.actualUrl = this.baseUrl;
		this.isOpen = true;
		this.fileSearch = "";
		this.inSearch=false;
	}
	private close():void{
		this.isOpen=false;
		this.refresh();
	}
	private showSearch():void{
		this.inSearch=!this.inSearch;
		this.refresh();
	}
	private detached():void{
		console.log('removido!!!');
	}
	private attached():void{		
		fileTypeStore.onChange.subscribe(() => {
			(<any>this).refresh();
		});
		folderTypeStore.onChange.subscribe(() => {
			(<any>this).refresh();
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
		console.log(directoryindex);
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
				this.onChangeDir.emit(this.actualUrl);
				folderTypeStore.changeDir(this.actualUrl);
				fileTypeStore.changeDir(this.actualUrl);
			}
		}else{
			this.actualUrl = this.baseUrl;
			this.onChangeDir.emit(this.actualUrl);
			folderTypeStore.changeDir(this.actualUrl);
			fileTypeStore.changeDir(this.actualUrl);
		};
		
	}
}