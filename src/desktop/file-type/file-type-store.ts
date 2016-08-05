import {EventEmitter} from "event-emitter-lite";
import {IFileType} from "./file-type-interface";
import $xhr = require('promised-xhr');
import fileManagerDispatch from "../file-manager/file-manager-dispatch";

class FileTypeStore{
	public onChange:EventEmitter<any> = new EventEmitter();
	
	private filetype:IFileType[];

	constructor(){
		this.filetype = [];

		this.changeDir("example");
		fileManagerDispatch.dispatchChangeDir.subscribe((new_dir:string)=>{
			this.changeDir(new_dir);
		});
	}
	private changeDir(path:string):void{
		$xhr.get("rest/file?directory="+path).then((res:any) =>{
			this.filetype = res.body;
			this.onChange.emit(null);
		});
	}
	public get():IFileType[]{
		return this.filetype;
	}

}

export default new FileTypeStore();