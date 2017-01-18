import {EventEmitter} from "event-emitter-lite";
import {IFileType} from "./file-type-interface";
import $xhr = require('promised-xhr');

class FileTypeStore{
	public onChange:EventEmitter<any> = new EventEmitter();	
	private filetype:IFileType[];
	constructor(){
		this.filetype = [];
		this.changeDir("example");
	}
	public changeDir(path:string):void{
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