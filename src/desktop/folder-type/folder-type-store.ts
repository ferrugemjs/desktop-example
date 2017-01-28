import {EventEmitter} from "event-emitter-lite";
import {IFolderType} from "./folder-type-interface";
import $xhr = require('promised-xhr');

class FolderTypeStore{
	public onChange:EventEmitter<any> = new EventEmitter();
	
	private folders:IFolderType[];

	constructor(){
		this.folders = [];
		this.changeDir("example");
	}
	public changeDir(path:string):void{		
		$xhr.get("rest/folder?directory="+path).then((res:any) =>{
			this.folders = res.body;
			this.onChange.emit(null);
		});
	}
	public get():IFolderType[]{
		return this.folders;
	}
}

export default new FolderTypeStore();