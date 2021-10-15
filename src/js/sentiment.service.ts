
import { catchError, of, pluck } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";


export class SentimentRecognition {

    constructor() {}

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
        alert(err);
        return of([]);
    }






}




