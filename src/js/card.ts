
import { fromEvent, interval, switchMap, takeWhile, withLatestFrom } from "rxjs";
import { Alert } from "./alert";

export class Card{

    templateCard: string;
    alert: Alert;
    secondRemoveCard: number = 20;
    secondAnimationCard: number = 1000;

    constructor(
    ) {
        this.alert = Alert.prototype;
        this.templateCard = this.createTemplateComponent();
    }

    createTemplateComponent() {
        return `
                    <article class="c-card" js-card>
                        <textarea name="" id="" class="c-card__textarea" placeholder="Escribe aquí..."></textarea>
                    </article>
                `;
    }
    

    addCard(target) {
        const elementTarget = target.nextElementSibling;
        if(!!elementTarget.attributes['js-slide-card'] && elementTarget.querySelectorAll('[js-slider-card__item]').length < 3 && elementTarget.querySelectorAll('[js-slider-card__item]').length > -1){
            const elementSlideCard = document.createElement('div');
            elementSlideCard.className = "c-slider-card__item";
            elementSlideCard.setAttribute("js-slider-card__item", "");
            elementSlideCard.innerHTML = this.templateCard;
            target.nextElementSibling.append(elementSlideCard);
            this.removeCardEvent(elementSlideCard);
        }else{
            this.alert.open('alertErrorLimitCards');
        }
    }

    removeCardEvent(elementCard?: HTMLDivElement) {

        if( !!elementCard){
            elementCard = elementCard
        }else{
            elementCard = document.querySelector('[js-slider-card__item]');
        }

        const focusOutCard$ = fromEvent<any>(elementCard, 'keyup');
        const interval$ = interval(1000);

        focusOutCard$.pipe(
            switchMap( () => interval$ ),
            withLatestFrom(focusOutCard$),
            takeWhile( arrayData => arrayData[0] < this.secondRemoveCard, true ),
        )        
        .subscribe( 
            {
                next: (dataObject) => {
                    console.log('next: ', dataObject);
                    this.removeCardAnimation(dataObject);
                },
                error: (err) => null,
                complete: () => console.log('complete obs$')
            }
        );
    }

    removeCardAnimation(dataObject){
        if( dataObject[0] >= 20){
            dataObject[1].target.closest('[js-slider-card__item]').classList.add('c-slider-card__item--fadeout');
            setTimeout(() => {
                dataObject[1].target.closest('[js-slider-card__item]').remove();
            }, this.secondAnimationCard);
        }
    }

}


