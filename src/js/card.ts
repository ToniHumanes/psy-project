

export class Card {

    templateCard: string;

    constructor() {
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
        if(!!target.nextElementSibling.attributes['js-slide-card']){
            const elementSlideCard = document.createElement('div');
            elementSlideCard.className = "c-slider-card__item";
            elementSlideCard.innerHTML = this.templateCard;
            target.nextElementSibling.append(elementSlideCard);
        }
    }

    removeCard() {

    }

}


