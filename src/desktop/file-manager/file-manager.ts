import {IFileType} from "../file-type/file-type-interface";
import {IFolderType} from "../folder-type/folder-type-interface";
import fileTypeStore from "../file-type/file-type-store";
import folderTypeStore from "../folder-type/folder-type-store";
import {IEventSubscribe,EventEmitter} from "event-emitter-lite";
import {EStatusRequest} from "../status-bar/status-request-enum";
import statusBarDispatch from "../status-bar/status-bar-dispatch";

export class FileManager{
	private baseUrl:string;
	private actualUrl:string;
	private visible:boolean;
	private fileSearch:string;
	private inSearch:boolean;
	public onChangeDir:EventEmitter<string> = new EventEmitter();
	private refresh:Function;
	private inscFileStore:IEventSubscribe;
	private inscFolderStore:IEventSubscribe;
	constructor(){
		this.baseUrl = "example";
		//this.baseUrl = "..";
		this.actualUrl = this.baseUrl;
		this.visible = true;
		this.fileSearch = "";
		this.inSearch=false;
	}
	private close():void{
		this.visible=false;
		fileTypeStore.onChange.unsubscribe(this.inscFileStore);
		folderTypeStore.onChange.unsubscribe(this.inscFolderStore);
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
		console.log('agora e a hora!!!')
		this.inscFileStore  = fileTypeStore.onChange.subscribe(() => {
			(<any>this).refresh();
		});
		this.inscFolderStore  = folderTypeStore.onChange.subscribe(() => {
			statusBarDispatch.dispatchRequestStatus.emit(EStatusRequest.RECEIVED);
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
		statusBarDispatch.dispatchRequestStatus.emit(EStatusRequest.SEND);
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