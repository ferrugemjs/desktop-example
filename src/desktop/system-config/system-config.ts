import systemConfigDispatch from "./system-config-dispatch";
import appsBarDispatch from "../apps-bar/apps-bar-dispatch";

export class SystemConfig{
	private isOpen:boolean=false;
	private attached():void{
		systemConfigDispatch.dispatchCloser.subscribe((on)=>{
			this.isOpen = on;
			(<any>this).refresh();
		});
		appsBarDispatch.dispatchHidden.subscribe((on)=>{			
			if(!on){
				this.isOpen = on;
				(<any>this).refresh();
			}
		});
	}
	private setBackgroundImage(bckimg:string):void{
		systemConfigDispatch.dispatchChangeBackgroundImage.emit(bckimg);
	}
}