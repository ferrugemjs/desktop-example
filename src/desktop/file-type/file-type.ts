import {IFileType} from "../interfaces/i-file-type";

export class FileType implements IFileType{
    public name:string;
    public path:string;
    public extension:string;
    constructor(){
        this.name = "default name";
        this.extension = "";
    }
}