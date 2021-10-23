
import { sentimentResult } from './sentimentResult.interface';

export class AdvicesList {


    listElement : Element;
    adviceElement: Element;
    adviceTitle: HTMLElement;
    adviceTextTitle: string;
    advicesTextArray: Array<string>;

    constructor() {
        this.listElement = document.querySelector('[js-advice]');
        this.adviceElement = document.querySelector('[js-list]');
        this.adviceTitle = document.querySelector('[js-advice-title]');

    }

    showViewText(dataObject: sentimentResult) {

        let typeSentiment: string;

        // remove all element in to list before of inject news
        this.removeListItems(this.adviceElement);

        if (dataObject.result.type === 'negative') {
            typeSentiment = 'negativo, voy a intentar ayudarte';
            this.advicesTextArray  = [
                "Comienza el día de manera positiva: la forma en que comienzas la mañana suele establecer el tono para el resto del día.",
                "Para – Respira – Enfoca: no hagas una montaña de un grano de arena. Es muy fácil perder perspectiva, especialmente si estás estresado y vas demasiado rápido. Cuando sientas que el pensamiento negativo te absorbe, para, respira y re-enfoca tus pensamientos.",
                "Para tener pensamientos positivos de la vida también es importante compartir tiempo con personas que te aporten tranquilidad, que te ayuden a reflexionar. Así que rodéate de gente optimista.",
                "Lleva un estilo de vida saludable: Haz ejercicio regularmente y come y duerme bien. Esto mantendrá tu cuerpo sano y tu mente despejada.",
                "Realiza cambios: quedarnos en el mismo lugar donde no somos felices no nos permite ser positivos ni avanzar en la vida. Así que empieza realizando cambios con los cuales te sientas cómodo y feliz; a partir de ahí tus pensamientos también podrán evolucionar de manera optimista.",
                "Encuentra el punto de vista optimista en una situación negativa: El objetivo es intentar sacar algo bueno de la situación: convertir la circunstancia en oportunidad.",
                "Identifica tus pensamientos negativos y transfórmalos: cuando llegue a tu mente algún pensamiento negativo, acéptalo y a partir de ahí observa como podrías transformarlo."
            ];
        } else if (dataObject.result.type === 'positive') {
            typeSentiment = 'positivo, eso esta genial!!, de todas formas te voy a ayudar a que sigas así';
            this.advicesTextArray = [
                "Agradece todo lo que tienes: escribe en un papel 10 cosas que te tengas en tu vida y te hagan feliz y enfócate en todas esas cosas buenas.",
                "Invierte tu dinero en experiencias en lugar de hacerlo en cosas materiales.",
                "Enfréntate a tus retos. Cuanto más atrasas algo, más ansiedad y tensión te generas. Escribe pequeñas listas semanales de tus objetivos y cúmplelos.",
                "¡Sonríe! La gente positiva sonríe mucho, sonríe siempre. Cuando sonríes estás aportando optimismo, estás mostrando buen humor, estás demostrando respeto y estás transmitiendo buenas vibraciones.",
                "Medita: practicar meditación nos aporta tranquilidad y relajación. Lo que significa que a la hora de pensar esta técnica milenaria puede ayudarte a reflexionar de una forma más positiva, relajada y realista."
            ];
        } else {
            typeSentiment = 'bien, de todas formas te voy a ayudar a que mejores tu estado de ánimo';
            this.advicesTextArray = [
                "Comprender y conocer nuestras emociones siempre brindará y ayudará a la hora de tener un control sobre los pensamientos.",
                "Aprende a responder a las críticas de manera saludable: la clave residen en aprender a manejarla de una manera más saludable, en cualquier caso, no hay que tomarse las críticas como algo personal, dejarlas ir y si puedes aprender algo de ellas, aprovéchala.",
                "Ve despacio: pensamos rápido, hablamos rápido, nos movemos rápido… todo entra en una espiral que da lugar a una vida estresante y superficial. Adquirir hábitos de pensamiento positivo exige ir más despacio.",
                "Practica deporte y aliméntate sanamente: cuerpo sano, mente sana, así que practica deporte y aliméntate bien. El bienestar físico es proporcional al bienestar mental.",
                "Duerme bien : un cerebro que descansa puede pensar y actuar mejor. Por ello duerme lo suficiente y lo notarás en tus pensamientos y en la forma en como ves tu vida.",
                "Cuida apariencia personal: arréglate, siéntete atractivo/a y vístete como si fueras a salir. Se sabe que las personas nos sentimos más felices cuando se ven bien."
            ];
        }

        this.adviceTextTitle = `Veo que estas ${typeSentiment}.`;
        this.adviceTitle.innerText = this.adviceTextTitle;
        
        for (let i = 0; i < this.advicesTextArray.length; i++) {
            const liElement = document.createElement('li');
            liElement.classList.add('c-list__item');
            liElement.setAttribute('js-list-item', 'js-list-item');
            liElement.innerText = this.advicesTextArray[i];
            this.adviceElement.append(liElement);
        }

        this.listElement.classList.remove('u-hidden');
        this.scrollToList();
    }

    removeListItems(adviceElement: Element){
        const listItemElements = adviceElement.querySelectorAll('[js-list-item]');
        for (let i = 0; i < listItemElements.length; i++) {
            listItemElements[i].remove();
        }
    }

    scrollToList(){
        this.listElement.scrollIntoView({block: "start", behavior: "smooth"});
    }
}