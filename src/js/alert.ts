
export class Alert {
    constructor() {
    }

    open(idAlert: string){
        this.closeAll();
        const alertComponent = document.querySelector(`#${idAlert}`);
        alertComponent.setAttribute('style', `transition: 1s ease; transform: translate(0px, 0px); opacity:1;`);
    }

    closeAll(){
        const alertComponents = document.querySelectorAll('[js-alert]');
        for (let i = 0; i < alertComponents.length; i++) {
            alertComponents[i].setAttribute('style', `transition: 1s ease; transform: translate(0px, 100%); opacity:0;`)
        }
    }

    close(target){
        const alertComponent = target.srcElement.closest('[js-alert]');
        const alertComponentHeight = alertComponent.clientHeight;
        alertComponent.setAttribute('style', `transition: 1s ease; transform: translate(0px, ${alertComponentHeight}px); opacity:0;`)
    }
}
