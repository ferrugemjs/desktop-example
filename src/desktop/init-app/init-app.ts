import {changeBackground} from "../actions/app";

export class Main{
    private selectedBackgroundImage:string;
    private refresh:Function;
    private colorE = "#facada";
    constructor(){
        this.selectedBackgroundImage = "src/desktop/init-app/assets/img/dotted_bg-min.png";
    }
    private connectedCallback(){
        changeBackground
            .subscribe(background => this.changeBackgroundImage(background));
    }
    private changeBackgroundImage(bckimg:string):void{
        this.selectedBackgroundImage = bckimg;
        let tmp_element:any = document.getElementsByClassName("main-app")[0];
        tmp_element.style["background-image"] = `url('${bckimg}')`;    
    }
}
