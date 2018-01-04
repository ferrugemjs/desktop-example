export interface IAppItem{
    pid:number;
    task:string;
    description:string;
    icon:string;
    path:string;
    disconnectedCallback?:()=>void;
    visible?:boolean;
}