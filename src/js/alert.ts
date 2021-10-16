
export class Alert {
    constructor() {
    }

    open(idAlert: string){
        const alertComponent = document.querySelector(`#${idAlert}`);
        alertComponent.setAttribute('style', `transition: 1s ease; transform: translate(0px, 0px); opacity:1;`);
    }

    close(target){
        const alertComponent = target.srcElement.closest('[js-alert]');
        const alertComponentHeight = alertComponent.clientHeight;
        alertComponent.setAttribute('style', `transition: 1s ease; transform: translate(0px, ${alertComponentHeight}px); opacity:0;`)
    }
}
