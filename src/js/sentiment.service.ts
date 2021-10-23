
import { catchError, of, pluck } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Loading } from "./loading";
import { Alert } from "./alert";


export class SentimentRecognition{

    loading: Loading;
    alert: Alert;

    constructor() {
        this.loading = Loading.prototype;
        this.alert = Alert.prototype;
    }

    async postDataSentiment(objectData){

        const URL_TRANSLATE_SERVICE = 'https://sentim-api.herokuapp.com/api/v1/';
        const headers = {"Accept": "application/json", "Content-Type": "application/json"}
        const jsonSend = JSON.stringify(objectData);
        
        return ajax<AjaxResponse<any>>({
            url: URL_TRANSLATE_SERVICE,
            method: 'POST',
            headers,
            body: jsonSend
        }).pipe(
            pluck('response'),
            catchError( this.controlError.bind(this) )
        );
    }

    controlError(){
        this.loading.close();
        this.alert.open('alertErrorService');
        return of([]);
    }






}




