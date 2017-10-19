import {EventEmitter} from "event-emitter-lite";
import {IFileType} from "../interfaces/i-file-type";

class FileTypeStore{
    public onChange:EventEmitter<void> = new EventEmitter();    
    private filetype:IFileType[];
    constructor(){
        this.filetype = [];
        this.changeDir("example");
    }
    public changeDir(path:string):void{
        fetch(`rest/file?directory=${path}`)
        .then(res => res.json())
        .then(res =>{
            this.filetype = res;
            this.onChange.emit(null);
        });
    }
    public get():IFileType[]{
        return this.filetype;
    }
}

export default new FileTypeStore();