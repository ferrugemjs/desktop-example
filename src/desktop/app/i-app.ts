export interface IAppItem{
	pid:number;
	task:string;
	description:string;
	icon:string;
	path:string;
	detached?:()=>void;
	visible?:boolean;
}