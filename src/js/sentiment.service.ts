
import { catchError, of, pluck } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";
import { Loading } from "./loading";


export class SentimentRecognition{

    loading: Loading;

    constructor() {
        this.loading = Loading.prototype;
    }

    postDataSentiment(objectData){

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
            catchError( this.controlError )
        );
    }

    controlError(err){
        this.loading.close();
        return of([]);
    }






}




