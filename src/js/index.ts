
import '../styles/styles.scss';
import { from, fromEvent, map, Observable, pluck, takeWhile, tap } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { Modal } from './modal';
import { Card } from './card';
import { Alert } from './alert';
import { Loading } from './loading';
import { ValidateForm } from './validate-form';
import { SentimentRecognition } from './sentiment.service';

class initApp {

    _modal: Modal;
    _card: Card;
    _alert: Alert;
    _loading: Loading;
    validateForm: ValidateForm;
    sentimentService: SentimentRecognition;
    sendFormClick$: any;

    constructor(
        sentimentService: SentimentRecognition,
        modal: Modal,
        card: Card,
        alert: Alert,
        loading: Loading,
        validateForm: ValidateForm
    ) {
        this._modal = modal;
        this._card = card;
        this._alert = alert;
        this._loading = loading;
        this.validateForm = validateForm;
        this.sentimentService = sentimentService;
        this.createEventForm();
    }


    openModalExample(e) {
        e.preventDefault();
        const elementTarget = e.target.attributes['js-open-modal'];
        if (!!elementTarget) {
            const attrName = elementTarget.value;
            this._modal.open(attrName);
        }
    }

    closeModalExample(e) {
        if (!!e.target.attributes['js-close-modal'] && !!e.target.attributes['js-close-modal'].value) {
            this._modal.close();
        }
    }

    addCard(e) {
        e.preventDefault();
        let targetElement = e.target.closest('a');
        if (!!targetElement && !!targetElement.attributes['js-add-card']) {
            this._card.addCard(targetElement);
        }
    }


    closeAlert(e){
        if (!!e.target.attributes['js-close-alert']) {
            this._alert.close(e);
        }
    }

    getValuesForm(e) {
        const formElement = e.form;
        const isValid = this.validateForm.isRequireds(formElement);
        let valuesFormItem = [];
        if (!!isValid) {
            const elementsForm = this.validateForm.getElementsForm(formElement);
            valuesFormItem = this.validateForm.getValuesElementsForm(elementsForm);
        }

        return from(valuesFormItem);
    }

    sendForm(target: EventTarget) {
        return this.getValuesForm(target)
            .pipe(
                takeWhile((data: Array<NodeList>) => data.length > 0),
                map<Array<NodeList>, object>((data: Array<NodeList>) => (
                    { text: data }
                )),
                tap(() => Loading.prototype.open()),
                exhaustMap<object, Observable<any>>((dataObject: object) => this.sentimentService.postDataSentiment(dataObject))
            )
    }

    createEventForm() {
        // ------ Events obs$ ---------
        this.sendFormClick$ = fromEvent<MouseEvent>(document.querySelector('[js-send-form]'), 'click');
        this.sendFormClick$.pipe(
            tap((ev: Event) => ev.preventDefault()),
            pluck('target'),
            takeWhile((target: any) => target.getAttributeNames().includes('js-send-form')),
            exhaustMap<any, any>((target: any) => this.sendForm(target))
        )
            .subscribe((dataObject: any) => {
                console.log('no se que saldrá', dataObject);
                this._loading.close();
                this._alert.open('alertSuccessServiceSentiment');
            });
    }

    validateFormReactive(e) {
        const formElement = e.target.closest('#formEmotion');
        if ( (e.target.type === 'textarea' || e.target.type === 'input' || e.target.type === 'select') && !!formElement) {
            this.validateForm.isRequireds(formElement);
        }
    }
}

// -------- Instance app Module load resourses ----------

const appControlModule = new initApp(new SentimentRecognition, new Modal, new Card, new Alert, new Loading,  new ValidateForm);

((appControlModule) => {

    // -------- Events ---------

    const arrayMethods: any = [
        {
            method: appControlModule.openModalExample,
            typeEvent: 'click'
        },
        {
            method: appControlModule.closeModalExample,
            typeEvent: 'click'
        },
        {
            method: appControlModule.addCard,
            typeEvent: 'click'
        },
        {
            method: appControlModule.closeAlert,
            typeEvent: 'click'
        },
        {
            method: appControlModule.validateFormReactive,
            typeEvent: 'keyup'
        }
    ];

    function setEventsListener(arrayMethod: Array<Function>) {
        for (let i = 0; i < arrayMethod.length; i++) {
            document.addEventListener(arrayMethods[i].typeEvent, arrayMethods[i].method.bind(appControlModule));
        }
    }
    setEventsListener(arrayMethods);

})(appControlModule);

// tests cases

/**
 * No dejar crear más de 3 Cards
 * Crear componente alerta
 * animación de las alertas
 * Si el servicio es ok, avisar con una alerta de las de abajo
 * Si el servicio no es ok, avisar con una alerta de las de abajo
 * Cambiar la vista y sacar textos dependiendo de "polarity" y "type"
 * Texto: "i am Toni, i am very happy, because have a vr glass"
 * Programar el tema de que si llevas muchos días triste te saque modal
 */