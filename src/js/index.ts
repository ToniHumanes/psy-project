
import '../styles/styles.scss';
import { SentimentRecognition } from './sentiment.service';
import { Modal } from './modal';
import { Card } from './card';
import { ValidateForm } from './validate-form';
import { from, fromEvent, map, pluck, takeWhile, tap } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

class initApp {

    _modal: Modal;
    _card: Card;
    validateForm: ValidateForm;
    sentimentService: SentimentRecognition;
    sendFormClick$: any;

    constructor(
        sentimentService: SentimentRecognition,
        modal: Modal,
        card: Card,
        validateForm: ValidateForm
    ) {
        this._modal = modal;
        this._card = card;
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

    sendForm(target){
        return this.getValuesForm(target)
        .pipe(
            takeWhile( (data:any) => data.length > 0),
            map<any, any>( (data:any) => (
                {text: data}
            )),
            exhaustMap<any,any>( (dataObject: any) => this.sentimentService.postDataSentiment(dataObject))
        )
    }

    createEventForm() {
        // ------ Events obs$ ---------
        this.sendFormClick$ = fromEvent<MouseEvent>(document.querySelector('[js-send-form]'), 'click');
        this.sendFormClick$.pipe(
            tap((ev: any) => ev.preventDefault()),
            pluck<any, any>('target'),
            takeWhile((target: any) => target.getAttributeNames().includes('js-send-form')),
            exhaustMap<any,any>( (target: any) => this.sendForm(target))
        )
            .subscribe((dataObject) => {
                console.log('no se que saldrá', dataObject);
            });
    }

    validateFormReactive(e) {
        if (e.target.type === 'textarea' || e.target.type === 'input' || e.target.type === 'select') {
            const formElement = e.target.closest('#formEmotion');
            this.validateForm.isRequireds(formElement);
        }
    }
}

// -------- Instance app Module load resourses ----------

const appControlModule = new initApp(new SentimentRecognition, new Modal, new Card, new ValidateForm);

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
            method: appControlModule.validateFormReactive,
            typeEvent: 'focusout'
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

(() => {

})();






// tests cases

/**
 * No dejar crear más de 6 Cards
 * Crear componente alerta
 * animación de las alertas
 * Si el servicio es ok, avisar con una alerta de las de abajo
 * Si el servicio no es ok, avisar con una alerta de las de abajo
 * Cambiar la vista y sacar textos dependiendo de "polarity" y "type"
 * Texto: "i am Toni, i am very happy, because have a vr glass"
 * Programar el tema de que si llevas muchos días triste te saque modal
 */


//  map(values => ({
//     text: values[0]
// })),
// exhaustMap(objectValue => appControlModule.sentimentService.postDataSentiment(objectValue))