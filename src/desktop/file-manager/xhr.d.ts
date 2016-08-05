declare module 'promised-xhr' {
	interface ixhrResponse{
		body:any
	}
	interface ithen{
		then:(res:ixhrResponse)=>any;
	}

    class xhr{
        get(url:string,config?:{}):any;
        post(url:string,config?:{}):any;
        base:string;
    }
    let $xhr:xhr;
    export = $xhr;
}