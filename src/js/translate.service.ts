

import { catchError, of, pluck } from "rxjs";
import { ajax } from "rxjs/ajax";


export class Translate {
    translate$: any;
    constructor() {
        
    }


    postDataTranslate(){
        const URL_TRANSLATE_SERVICE = 'https://libretranslate.com/translate';
        const headers = {"Content-Type": "application/json" }
        
        const jsonSend = JSON.stringify({
            "q": "i am very tired and very angry because you said me this new notice",
            "source": "en",
            "target": "es"
        });
        
        this.translate$ = ajax({
            url: URL_TRANSLATE_SERVICE,
            method: 'POST',
            headers,
            body: jsonSend
        }).pipe(
            pluck('response'),
            catchError( this.controlError )
        );

        return this.translate$;
    }

    controlError(err){
        console.log('error', err);
        return of([]);
    }


}




