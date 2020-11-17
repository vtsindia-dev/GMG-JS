
/**
 * Handle form button loader
 *
 * @param {jQuery DOMElt} parentElt
 * @returns void
*/ 
class Loader {

    constructor(parentElt) {

        if (typeof(parentElt) === "undefined"){
            throw new Error(`/!\\ [${this.constructor.name}.constructor] parentElt is undefined !`);
        }
        if (!parentElt.length){
            throw new Error(`/!\\ ["${this.constructor.name}.constructor] parentElt not found !`);
        }        
        this.parentElt = parentElt;
        this.type = this.parentElt[0].tagName.toLowerCase();    // button, div

        this.spinner = '<span class="spinner-grow spinner-grow-sm mr-1" role="status" aria-hidden="true"></span>';
    }

    start (){
        if (this.type === 'button'){
            this.parentElt.prepend(this.spinner);
            this.parentElt.prop('disabled', true);
        }
        else if (this.type === 'div'){
            this.parentElt.addClass('text-center');
            this.parentElt.prepend(this.spinner);
        }
    }

    stop (){
        if (this.type === 'button'){
            this.parentElt.find('span.spinner-grow').detach();
            this.parentElt.prop('disabled', false);
        }
        else if (this.type === 'div'){
            this.parentElt.removeClass('text-center');
            this.parentElt.find('span.spinner-grow').detach();
        }
    }
}

module.exports = Loader;

