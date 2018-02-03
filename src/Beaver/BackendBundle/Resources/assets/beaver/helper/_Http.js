'use strict';

/**
 * Define Http Helpers Package.
 *
 * @type {{}}
 * @private
 */
let _Http = {
    /**
     * Request default values.
     */
    defaults: {
        method: 'GET',
        url: '',
        data: '',
        callback: (response) => {
            console.log(response);
        }
    },

    /**
     * Response Validator.
     *
     * @param response
     * @returns {boolean}
     * @constructor
     */
    Response: (response) => {
        if (false === response.status) {
            _Modal.Error('algo malió sal');
            return false;
        }
    },

    /**
     * Define Http Ajax Request.
     *
     * @param options
     * @constructor
     */
    Request: (options) => {
        let settings = $.extend(_Http.defaults, options);

        $.ajax({
            method: settings.method,
            url: settings.url,
            data: settings.data,
            success: (response) => {
                if (false !== _Http.Response(response)) {
                    settings.callback(response.data);
                }
                _Utils.loaderOut();
            }
        });
    },

    /**
     * Http GET Method Request.
     *
     * @param options
     * @constructor
     */
    Get: (options) => {
        let settings = $.extend(_Http.defaults, options).method = 'GET';

        _Http.Request(options);
    },

    /**
     * Http POST Method Request.
     *
     * @param options
     * @constructor
     */
    Post: (options) => {
        let settings = $.extend(_Http.defaults, options).method = 'POST';

        _Http.Request(options);
    },

    /**
     * Http PUT Method Request.
     *
     * @param options
     * @constructor
     */
    Put: (options) => {
        let settings = $.extend(_Http.defaults, options).method = 'PUT';

        _Http.Request(options);
    },

    /**
     * Http DELETE Method Request.
     *
     * @param options
     * @constructor
     */
    Delete: (options) => {
        let settings = $.extend(_Http.defaults, options).method = 'DELETE';

        _Http.Request(options);
    }
};
