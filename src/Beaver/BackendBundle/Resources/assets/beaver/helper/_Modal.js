'use strict';

/**
 * Define Modal Windows for Alerts, Message, Confirms and Contents.
 *
 * @type {{}}
 * @private
 */
let _Modal = {
    /**
     * Initilize Form into Modal Window.
     *
     * @param options
     * @constructor
     */
    Form: (options) => {
        this.defaults = {
            url: false,
            data: false,
            callback:   (response) => {
                console.log(response);
            },
        };

        let settings = $.extend(this.defaults, options);

        if (settings.source === false) {
            return;
        }

        _Http.Get({
            url: settings.url,
            data: settings.data,
            callback: (data) => {
                swal({
                    html                : data,
                    showCloseButton     : true,
                    showCancelButton    : false,
                    showConfirmButton   : false,
                    onOpen: function () {
                        $('form').on('submit', function(e){
                            e.preventDefault();

                            _Utils.loaderIn();

                            _Http.Request({
                                method  : $('form').attr('method'),
                                url     : $('form').attr('action'),
                                data    : $('form').serialize(),
                                callback: (data) => {
                                    settings.callback(data);
                                    _Modal.Close();
                                }
                            });
                        });
                        _Utils.loaderOut();
                    }
                });
            }
        });
    },

    /**
     * Alert.
     * @param message
     * @constructor
     */
    Alert: (message) => {
        swal(message);
    },

    /**
     * Success Alert.
     * @param options
     * @constructor
     */
    Success: (options) => {
        this.defaults = {
            text: '',
            onClose: () => {}
        };

        let settings = $.extend(this.defaults, options);

        swal({
            title   : 'Buen trabajo!',
            text    : settings.text,
            type    : 'success',
            onClose : settings.onClose
        });
    },

    /**
     * Error.
     * @param message
     * @constructor
     */
    Error: (message) => {
        swal('Oops...', message, 'error');
    },

    /**
     * Confirm.
     *
     * @param options
     * @constructor
     */
    Confirm: (options) => {
        this.defaults = {
            title: 'Confirm:',
            text: '',
            callback: (resolve, reject) => {
                resolve();
            },
            preConfirm: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            },
            message: false,
            onClose: () => {}
        };

        var settings = $.extend(this.defaults, options);

        swal({
            title                   : settings.title,
            text                    : settings.text,
            type                    : 'warning',
            showCancelButton        : true,
            showLoaderOnConfirm     : true,
            /*preConfirm              : () => {
                return new Promise((resolve, reject) => {
                    return settings.callback(resolve, reject);
                });
            },*/
            onClose                 : settings.onClose
        }).then(() => {
            settings.callback();
            _Modal.Success({
                text        : settings.message,
                onClose     : settings.onClose
            });
        });
    },

    /**
     * Close Modal Windows.
     *
     * @constructor
     */
    Close: () => {
        swal.close();
    },
};
