import {IAppItem} from "../interfaces/i-app";
import {EventEmitter,IEventSubscribe} from "event-emitter-lite";
import {dispatchTask} from "../actions/app-launcher";

export class AppLouncher{
    private _apps:IAppItem[];
    private refresh:Function;
    private inscDispatch:IEventSubscribe;
    constructor(){
        this._apps = [];
    }
    private get apps(){
        return this
                ._apps
                .filter(app => app.visible);
    }
    private disconnectedCallback():void{
        dispatchTask
            .unsubscribe(this.inscDispatch);
    }
    private connectedCallback():void{
        this.inscDispatch = dispatchTask
                                .subscribe(app => this.loadApp(app));
    }
    private loadApp(pmod:IAppItem):void{
        let item = this
                        .apps
                        .filter(mod => pmod.task === mod.task);
        console.log(this.apps);
        if(item.length){
            item[0].visible = true;     
        }else{
            pmod.visible = true;
            pmod.pid = this._apps.length;
            this._apps.push(pmod);  
        }   
        this.refresh();
    }
    private hiddenApp(pid:number):void{
        this._apps.some(app => {
            if(app.pid === pid){
                app.visible = false;
                return true;
            }
            return false;
        });
    }
    private hiddenApps(on:boolean):void{
        this
            ._apps
            .forEach(app => app.visible = false);
        this.refresh();     
    }
}