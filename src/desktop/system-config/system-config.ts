import {IEventSubscribe,EventEmitter} from "event-emitter-lite";
import {changeBackground} from "../actions/app";

interface IImgResource{
    desc:string;
    path:string;
}

export class SystemConfig{
    private hidden:boolean;
    public onChangeBackground:EventEmitter<string>=new EventEmitter();
    public onClose:EventEmitter<number> = new EventEmitter();
    private indxImg:number;
    private imgs:IImgResource[];
    private refresh:Function;
    private pid:number;
    constructor(){
        let baseUrl:string = "src/desktop/init-app/assets/img";
        this.imgs = [
            {desc:"default",path:`${baseUrl}/dotted_bg-min.png`}
            ,{desc:"gray-min-image",path:`${baseUrl}/gray-background-image-min.jpg`}
            ,{desc:"gray-image",path:`${baseUrl}/gray-background-image.jpg`}
            ,{desc:"green-image",path:`${baseUrl}/green-background-image.jpg`}
            ,{desc:"ttpat-background",path:`${baseUrl}/ttpat-min.jpg`}
        ];
        this.indxImg = 0;
    }
    private submitBackgroundImage():void{
        //console.log(this.imgs[this.indxImg].path);
        changeBackground.emit(this.imgs[this.indxImg].path);
        this.onChangeBackground.emit(this.imgs[this.indxImg].path);
        this.close();
    }
    private close():void{
        this.hidden = true;
        this.onClose.emit(this.pid);
        this.refresh();
    }

    private disconnectedCallback():void{
        this.onClose.unsubscribeAll();
        this.onChangeBackground.unsubscribeAll();
    }
}