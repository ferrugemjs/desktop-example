import {EventEmitter} from "event-emitter-lite";
import {IFolderType} from "./folder-type-interface";
import $xhr = require('promised-xhr');
import fileManagerDispatch from "../file-manager/file-manager-dispatch";
import statusBarDispatch from "../status-bar/status-bar-dispatch";
import {EStatusRequest} from "../status-bar/status-request-enum";


class FolderTypeStore{
	public onChange:EventEmitter<any> = new EventEmitter();
	
	private foldertype:IFolderType[];

	constructor(){
		this.foldertype = [];

		this.changeDir("example");
		fileManagerDispatch.dispatchChangeDir.subscribe((new_dir:string)=>{
			this.changeDir(new_dir);
		});
	}
	private changeDir(path:string):void{
		statusBarDispatch.dispatchRequestStatus.emit(EStatusRequest.SEND);
		$xhr.get("rest/folder?directory="+path).then((res:any) =>{
			this.foldertype = res.body;
			this.onChange.emit(null);
			statusBarDispatch.dispatchRequestStatus.emit(EStatusRequest.RECEIVED);
		
		});
	}
	public get():IFolderType[]{
		return this.foldertype;
	}

	

}

export default new FolderTypeStore();