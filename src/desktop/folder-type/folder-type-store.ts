import {EventEmitter} from "event-emitter-lite";
import {IFolderType} from "./folder-type-interface";

class FolderTypeStore{
    public onChange:EventEmitter<void> = new EventEmitter();
    private folders:IFolderType[];

    constructor(){
        this.folders = [];
        this.changeDir("example");
    }
    public changeDir(path:string):void{             
        fetch(`rest/folder?directory=${path}`)
        .then(res => res.json())
        .then(res =>{
            this.folders = res;
            this.onChange.emit(null);
        });
    }
    public get():IFolderType[]{
        return this.folders;
    }
}

export default new FolderTypeStore();
