

export class ValidateForm {
    isValid: boolean;
    constructor() {
    }

    

    isRequireds(formGroup: HTMLElement){
        
        this.isValid = true;
        const allElementsForm = this.getElementsForm(formGroup);
        this.removeErrors(allElementsForm)

        for (let i = 0; i < allElementsForm.length; i++) {
            if(!allElementsForm[i][0].value){
                this.setError(allElementsForm[i], 'Campo requerido')
                this.isValid = false;
            }
        }

        return this.isValid;
    }

    getElementsForm(formGroup: HTMLElement){
        const inputs = formGroup.querySelectorAll('input');
        const selects = formGroup.querySelectorAll('select');
        const textareas = formGroup.querySelectorAll('textarea');
        let allElementsForm = new Array;
        allElementsForm.push(inputs, selects, textareas );
        allElementsForm = allElementsForm.filter( nodeListItem => nodeListItem.length > 0 );

        return allElementsForm;
    }

    getValuesElementsForm(allElementsForm){
        const valuesArr: any = [];
        for (let i = 0; i < allElementsForm.length; i++) {
            const htmlElementsForm = allElementsForm[i];
            for (let i = 0; i < htmlElementsForm.length; i++) {
                valuesArr.push(htmlElementsForm[i].value);
            }            
        }

        return valuesArr;
    }

    setError(elementForm: HTMLElement, errorMessage: string){
        const elementError = document.createElement('span');
        elementError.className = 'c-text--error';
        elementError.setAttribute('js-form-error', 'true');
        elementError.innerHTML = errorMessage;
        elementForm[0].closest('[js-form-group]').append(elementError);
    }

    removeErrors(allElementsForm){
        for (let i = 0; i < allElementsForm.length; i++) {
            let elementError = allElementsForm[i][0].closest('[js-form-group]').querySelector('[js-form-error]');
            if(!!elementError){
                elementError.remove();
            }
        }
    }

}