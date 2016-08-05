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
	private setTheme(theme:string):void{
		systemConfigDispatch.dispatchChangeTheme.emit(theme);
	}
}