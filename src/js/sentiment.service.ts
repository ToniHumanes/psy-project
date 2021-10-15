
import { catchError, exhaustMap, map, mergeAll, of, pluck } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";


export class SentimentRecognition {

    sentiment$: any;

    constructor() {
        
    }


    postDataSentiment(objectData){

        const URL_TRANSLATE_SERVICE = 'https://sentim-api.herokuapp.com/api/v1/';
        const headers = {"Accept": "application/json", "Content-Type": "application/json"}
        const jsonSend = JSON.stringify(objectData);
        
        this.sentiment$ = ajax<AjaxResponse<any>>({
            url: URL_TRANSLATE_SERVICE,
            method: 'POST',
            headers,
            body: jsonSend
        }).pipe(
            pluck('response'),
            catchError( this.controlError )
        );

        return this.sentiment$;
    }

    controlError(err){
        console.log('error', err);
        return of([]);
    }






}




