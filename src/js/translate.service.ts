
import translate from "translate";
import { Alert } from './alert';
import { Loading } from './loading';

export class Translate {

    loading: Loading;
    alert: Alert;

    constructor() {

        this.loading = Loading.prototype;
        this.alert = Alert.prototype;
    }

    async postDataTranslate(textTranslate: string){
        return translate( textTranslate.toString() ,  {from: 'es', to: "en"} )
        .catch(()=>{
            this.loading.close();
            this.alert.open('alertErrorService');
        });
    }

}




