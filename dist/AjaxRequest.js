/**
 * Build Ajax request 
 * NB: uses JQuery Ajax
 *
 * @param {obj} params {
 *      @param {string} APIRoute
 *      @param {obj} data     
 *      @param {function} successFn
 *      @param {function} failedFn
 *      @param {obj} loader (NB: false désactive le loader)
 *      @param {string} method (POST|GET|PUT|DELETE)
 *      @param {boolean} isAuthentified  
 *      @param {obj} headers 
*       @param {string} contentType 
        @param {string} dataType (json|binary)
 *  }
 * @param {boolean} useInnerPromise
 * @param {boolean} debug
 * @returns void
*/
class AjaxRequest {

    constructor(params, useInnerPromise = true, debug = false) {

        this.XHRRequest = null;

        if (typeof (params.APIRoute) === "undefined" || params.APIRoute === "") {
            throw new Error(`/!\\ [ ${this.constructor.name} no APIRoute !`);
        }
        /*if (typeof (params.data) === "undefined" || (Object.keys(params).length === 0 && params.constructor === Object) ) { // === jQuery.isEmptyObject({})
            throw new Error("/!\\ [" + this.constructor.name + "] no data !");
        }*/
        if (typeof (params.loader) === "undefined") {
            //this.logger.error("/!\\ [" + this.constructor.name + "] loader is not set !"); 
            params.loader = null; // TODO add default loader   ?      
        }

        this.requestParams = {
            APIRoute: params.APIRoute,
            data: typeof (params.data) !== "undefined" ? params.data : null, // POST, PUT
            successFn: typeof (params.successFn) !== "undefined" ? params.successFn : null,
            failedFn: typeof (params.failedFn) !== "undefined" ? params.failedFn : null,
            loader: params.loader,
            method: typeof (params.method) !== "undefined" ? params.method.toUpperCase() : "GET",
            isAuthentified: typeof (params.isAuthentified) !== "undefined" ? params.isAuthentified : false,
            headers: typeof (params.headers) !== "undefined" ? params.headers : {},
            contentType: typeof (params.contentType) !== "undefined" ? params.contentType : "application/json",
            dataType: typeof (params.dataType) !== "undefined" ? params.dataType : "json"
        };
        /*if (requestParams.isAuthentified){    // TODO : à merger au moment de passer les params
            $.extend(requestParams.headers, this.getRequestAPIHeaders());
        }*/
        this.useInnerPromise = useInnerPromise;

        this.logger = new Logger(debug);
    }

    getRequestParams() {
        return this.requestParams;
    }
    getXHRRequest() {
        return this.XHRRequest;
    }

    send() {

        // loader : START
        if (this.requestParams.loader) {
            this.requestParams.loader.start();
        }

        // AJAX settings for binary files (download)
        let xhrFields = {};

        if (this.requestParams.dataType === 'binary') {

            xhrFields = {
                responseType: 'blob'
            };
        }

        this.XHRRequest = $.ajax({
            url: this.requestParams.APIRoute,
            type: this.requestParams.method,
            headers: this.requestParams.headers,
            data: this.requestParams.data ? (["POST", "PUT"].indexOf(this.requestParams.method) !== -1 ? JSON.stringify(this.requestParams.data) : this.requestParams.data) : null,
            cache: false,
            crossDomain: true,
            contentType: this.requestParams.contentType,
            dataType: this.requestParams.dataType,

            xhrFields: xhrFields,
        });

        let $this = this;

        if (this.useInnerPromise) {

            this.XHRRequest.done(function (response) {
                    try {

                        $this.logger.debug(`/!\\ [ ${$this.constructor.name} send (done)]`, response);

                        if ($this.requestParams.loader) {
                            $this.requestParams.loader.stop();
                        }

                        if (typeof ($this.requestParams.successFn) === "function") {
                            $this.requestParams.successFn.call($this, response);
                        }
                    } catch (error) {
                        $this.logger.error(`/!\\ [ ${$this.constructor.name} send (done)]`, error);

                        if (typeof ($this.requestParams.failedFn) === "function") {
                            $this.requestParams.failedFn.call($this, error);
                        }
                    }
                })
                .fail(function (error, textStatus, errorThrown) {
                    $this.logger.error(`/!\\ [ ${$this.constructor.name} send (fail)]`, error, textStatus, errorThrown);

                    if ($this.requestParams.loader) {
                        $this.requestParams.loader.stop();
                    }

                    if (typeof ($this.requestParams.failedFn) === "function") {
                        $this.requestParams.failedFn.call($this, error);
                    }
                })
            /*.always(function (response) {
                $this.logger.debug("/!\\ [" + $this.constructor.name + ".send (always)]", response);
            })
            .then(function (response) { // if multiple Ajax called
                $this.logger.debug("/!\\ [" + $this.constructor.name + ".send (then)]", response);
            });*/
        }
    }

}

module.exports = AjaxRequest;