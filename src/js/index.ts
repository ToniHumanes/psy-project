
import '../styles/styles.scss';
import { from, fromEvent, map, Observable, pluck, takeWhile, tap } from 'rxjs';
import { exhaustMap, mergeAll, mergeMap } from 'rxjs/operators';
import { Modal } from './modal';
import { Card } from './card';
import { Alert } from './alert';
import { Loading } from './loading';
import { ValidateForm } from './validate-form';
import { SentimentRecognition } from './sentiment.service';
import { Translate } from './translate.service';
import { AdvicesList } from './advices';
import { sentimentResult } from './sentimentResult.interface';


class initApp {

    _modal: Modal;
    _card: Card;
    _alert: Alert;
    _loading: Loading;
    validateForm: ValidateForm;
    sentimentService: SentimentRecognition;
    translateService: Translate;
    advices: AdvicesList;
    sendFormClick$: Observable<MouseEvent>;

    constructor(
        sentimentService: SentimentRecognition,
        translateService: Translate,
        advices: AdvicesList,
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
        this.translateService = translateService;
        this.advices = advices;
        this.createEventForm();
        this._card.removeCardEvent();
    }

    // open modal with event click
    // <button js-open-modal="modalExample">open</button>
    // "modalExample" is the modal id

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


    closeAlert(e) {
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

        return from(valuesFormItem)
    }

    async sendForm(target: EventTarget) {
        return (this.getValuesForm(target))
            .pipe(
                takeWhile((data: Array<NodeList>) => data.length > 0),
                map<Array<NodeList>, Promise<Observable<string>>>((data: any) => this.translateService.postDataTranslate(data)),
                mergeMap<Promise<Observable<string>>, any>((data) => data.then(async dataText => await this.sentimentService.postDataSentiment({ text: dataText })),
                )
            )
    }

    createEventForm() {
        // ------ Events obs$ ---------
        this.sendFormClick$ = fromEvent<MouseEvent>(document.querySelector('[js-send-form]'), 'click');
        this.sendFormClick$.pipe(
            tap((ev: Event) => ev.preventDefault()),
            pluck('target'),
            takeWhile((target: any) => target.getAttributeNames().includes('js-send-form')),
            exhaustMap<any, any>(async (target: any) => await this.sendForm(target)),
            mergeAll<any>(),
            mergeAll<any>()
        )
            .subscribe((dataObject: any) => {

                if (!!dataObject.result) {
                    this._alert.open('alertSuccessServiceSentiment');
                }
                console.log('no se que saldrá', dataObject);
                this.showAdviceInformation(dataObject);
                this.advices.showViewText(dataObject);
                this._loading.close();
            });
    }

    validateFormReactive(e) {
        const formElement = e.target.closest('#formEmotion');
        if ((e.target.type === 'textarea' || e.target.type === 'input' || e.target.type === 'select') && !!formElement) {
            this.validateForm.isRequireds(formElement);
        }
    }



    showAdviceInformation(dataObject: sentimentResult) {
        if (dataObject.result.type === 'negative' && dataObject.result.polarity <= -0.5) {
            const sentimentNegative = sessionStorage.sentimentNegative;

            !!sentimentNegative ? sessionStorage.setItem('sentimentNegative', (Number(sentimentNegative) + 1).toString()) : sessionStorage.setItem('sentimentNegative', '1');

            if (sentimentNegative > 6) {
                this._modal.open("modalSentimentNegative");
            }
        }
    }
}

// -------- Instance app Module load resourses ----------

const appControlModule = new initApp(new SentimentRecognition, new Translate, new AdvicesList, new Modal, new Card, new Alert, new Loading, new ValidateForm);

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
