import {EventEmitter} from "event-emitter-lite";
import {IAppItem} from "../interfaces/i-app";
import {dispatchTask} from "../actions/app-launcher";

export class AppsBar{
    public onHiddenApps:EventEmitter<boolean> = new EventEmitter();
    constructor(){
    }
    private hiddenApps(on:boolean){
        this.onHiddenApps.emit(true);
    }
    private disconnectedCallback(){
        this.onHiddenApps.unsubscribeAll();
    }
}