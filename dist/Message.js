/**
 * Show form message
 *
 * @param {jQuery DOMElt} parentElt
 * @returns void
*/ 
class Message {

	constructor(parentElt) {

    	if (typeof(parentElt) === "undefined"){
	        throw new Error(`/!\\ [ ${this.constructor.name}.constructor] parentElt is undefined !`);
	    }
    	if (!parentElt.length){
	        throw new Error(`/!\\ [ ${this.constructor.name}.constructor] parentElt not found !`);
	    }        
	    this.parentElt = parentElt;
	    this.message = null;
  	}

  	error (message){
	    let html_message = typeof(message) === 'string' ? message.replace(/\n/g, "<br />") : '';
	    let elt = `<div class="alert alert-danger" role="alert"><i class="mdi mdi-block-helper mr-2"></i>${html_message}</div>`;
	    this.message = message;
	    this.parentElt.prepend(elt)
	}

	success (message){
	    let html_message = typeof(message) === 'string' ? message.replace(/\n/g, "<br />") : '';
	    let elt = `<div class="alert alert-success" role="alert"><i class="mdi mdi-check-all mr-2"></i>${html_message}</div>`;
	    this.message = message;
	    this.parentElt.prepend(elt);
	}

	warning (message){
	    let html_message = typeof(message) === 'string' ? message.replace(/\n/g, "<br />") : '';
	    let elt = `<div class="alert alert-warning" role="alert"><i class="mdi mdi-alert-outline mr-2"></i>${html_message}</div>`;
	    this.message = message;
	    this.parentElt.prepend(elt);
	}

	remove (){
	    this.parentElt.find('div.alert').detach();
	}
};

module.exports = Message;

