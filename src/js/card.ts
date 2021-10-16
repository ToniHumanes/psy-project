
import { Alert } from "./alert";

export class Card{

    templateCard: string;
    alert: Alert;

    constructor(
    ) {
        this.alert = Alert.prototype;
        this.templateCard = this.createTemplateComponent();
    }

    createTemplateComponent() {
        return `
                    <article class="c-card" js-card>
                        <textarea name="" id="" cols="30" rows="10" class="c-card__textarea" placeholder="Escribe aquí..."></textarea>
                    </article>
                `;
    }

    addCard(target) {
        const elementTarget = target.nextElementSibling;
        if(!!elementTarget.attributes['js-slide-card'] && elementTarget.querySelectorAll('[js-slider-card__item]').length < 3 && elementTarget.querySelectorAll('[js-slider-card__item]').length > 0){
            const elementSlideCard = document.createElement('div');
            elementSlideCard.className = "c-slider-card__item";
            elementSlideCard.setAttribute("js-slider-card__item", "");
            elementSlideCard.innerHTML = this.templateCard;
            target.nextElementSibling.append(elementSlideCard);
        }else{
            this.alert.open('alertErrorLimitCards');
        }
    }

    removeCard() {
        // obs$
    }

}


