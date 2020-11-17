/**
 * Native console wrapper class
 *
 * @param {boolean} APP_DEBUG
 * @returns void
*/ 
class Logger {

    constructor(APP_DEBUG){
        this.APP_DEBUG = typeof(APP_DEBUG) !== "undefined" ? APP_DEBUG:false;
    }

    error (){
        if (this.APP_DEBUG)
        console.error.apply(console, arguments);
    }
    info (){
        if (this.APP_DEBUG)
        console.info.apply(console, arguments);
    }
    warn (){
        if (this.APP_DEBUG)
        console.warn.apply(console, arguments);
    }
    debug (){
        if (this.APP_DEBUG)
        console.debug.apply(console, arguments);
    }

}

module.exports = Logger;
