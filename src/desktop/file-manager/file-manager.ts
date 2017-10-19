import {IFileType} from "../interfaces/i-file-type";
import {IFolderType} from "../folder-type/folder-type-interface";
import fileTypeStore from "../file-type/file-type-store";
import folderTypeStore from "../folder-type/folder-type-store";
import {IEventSubscribe,EventEmitter} from "event-emitter-lite";
import {EStatusRequest} from "../status-bar/status-request-enum";
import {displayRequestStatus} from "../actions/status";
import * as Rx from "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounce";
import "rxjs/add/observable/timer";

export class FileManager{
    private baseUrl:string;
    private actualUrl:string;
    private fileSearch:string;
    private inSearch:boolean;
    public onChangeDir:EventEmitter<string> = new EventEmitter();
    public onClose:EventEmitter<number> = new EventEmitter();
    private refresh:Function;
    private inscs:IEventSubscribe[];
    private pid:number;
    private hidden:boolean;
    private obserSearchFile:Observable<IFileType>;
    constructor(){
        this.baseUrl = "example";
        this.actualUrl = this.baseUrl;
        this.fileSearch = "";
        this.inSearch = false;
        this.inscs = [];
    }
    private showSearch():void{
        this.inSearch=!this.inSearch;
        this.refresh();
    }
    private disconect(){
        this.onClose.emit(this.pid);
        this.inscs.forEach(insc=>insc.cancel());
        this.onClose.unsubscribeAll();
        this.onChangeDir.unsubscribeAll();
        this.inscs = [];
        //this.obserSearchFile.complete();
    }
    private close(){
        this.disconect();
        this.hidden = true;
        this.refresh();         
    }
    private disconnectedCallback():void{
        this.disconect();
    }
    private connectedCallback():void{                
        this.inscs.push(
            fileTypeStore.onChange.subscribe(() => {
                    this.refresh();
            })
        );
        this.inscs.push(
            folderTypeStore.onChange.subscribe(() => {
                    displayRequestStatus.emit(EStatusRequest.RECEIVED);
                    this.refresh();
            })
        );

        if(!this.obserSearchFile){
            Rx.Observable.create((observ:Observable<IFileType>) => {
                this.obserSearchFile = observ;
            })
            .debounce(() => Rx.Observable.timer(1000))
            .distinctUntilChanged()
            .subscribe((term:string) => {
                //console.log("aways subscribe %s",x);
                this.fileSearch = term;
                this.refresh();
            });
        }
    }
    private setTerm(evt:Event){
        (<any>this
            .obserSearchFile)
            .next((<any>evt.target).value);
    }
    private filterBySearch(file_item:IFolderType):boolean{
        let fileSearchConverted = this.fileSearch.toLowerCase();
        return file_item.name.toLowerCase().indexOf(fileSearchConverted) > -1;
    }
    private get files():IFileType[]{
        if(this.fileSearch){
            return fileTypeStore.get().filter(file_item => this.filterBySearch(file_item));
        }
        return fileTypeStore.get();             
    }

    private get folders():IFolderType[]{
        if(this.fileSearch){
            return folderTypeStore.get().filter(folder_item => this.filterBySearch(folder_item));   
        }
        return folderTypeStore.get();
    }
    private setDirectory(directoryindex:number):void{
        displayRequestStatus.emit(EStatusRequest.SEND);
        if(directoryindex > 0){
            let fileDirectory:string = "";
            let fileArray:string[] = this.actualUrl.split("/");
            //console.log(directoryindex,fileArray.length);
            if(directoryindex+1 < fileArray.length){                        
                for(let i=0;i < directoryindex+1;i++){
                    if(fileArray[i]){
                        fileDirectory += `${fileArray[i]}/`;
                    }
                }
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
        }            
    }
}