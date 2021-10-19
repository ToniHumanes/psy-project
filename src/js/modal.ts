

export class Modal{

    constructor(){}

    open(idModal: string){
        this.close();
        document.querySelector(`#${idModal}`).classList.remove('u-hidden');
    }

    close(){
        const allModals: NodeListOf<Element> = document.querySelectorAll('[modalElement]');
        
        for (let i = 0; i < allModals.length; i++) {
            if(!allModals[i].classList.contains('u-hidden')){
                allModals[i].classList.add('u-hidden');
            }
        }
    }


}