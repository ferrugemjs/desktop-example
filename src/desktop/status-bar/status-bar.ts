import {displayRequestStatus} from "../actions/status";
import {EStatusRequest} from "./status-request-enum";

enum EConnectionStatus{
    ONLINE
    ,OFFLINE
    ,SEND
    ,RECEIVED
}

export class StatusBar{
    private connectionStatus:string;
    constructor(){
        this.connectionStatus = this.enumToDescription(EConnectionStatus.OFFLINE);
    }
    private connectedCallback(){
        displayRequestStatus.subscribe((requestStatus)=>{
            if(requestStatus === EStatusRequest.RECEIVED){
                this.connectionStatus = this.enumToDescription(EConnectionStatus.RECEIVED);
            }else if(requestStatus===EStatusRequest.SEND){
                this.connectionStatus = this.enumToDescription(EConnectionStatus.SEND);
            }
            (<any>this).refresh();
        });
    }
    private enumToDescription(eStatus:EConnectionStatus):string{
        return EConnectionStatus[eStatus].toLowerCase();
    }
}