

export class Loading {
    loadingElements: NodeListOf<Element>;
    constructor() {}

    open(){
        this.close();
        document.querySelector('[js-loading]').classList.remove('u-hidden');
    }
    close(){
        this.loadingElements = document.querySelectorAll('[js-loading]');
        for (let i = 0; i < this.loadingElements.length; i++) {
            if(!this.loadingElements[i].classList.contains('u-hidden')){
                this.loadingElements[i].classList.add('u-hidden')
            }
        }
    }
}