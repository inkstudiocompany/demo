(function ($) {
    $.fn.extend({
        /**
         * Modal form.
         * @param options
         */
        modalForm: function (options) {
            var settings = $.extend($.fn.modalFormDefaults, options);

            if (settings.source === false) {
                return;
            }

            beaver.Http.Get({
                url: settings.source,
                data: settings.data,
                callback: (data) => {
                    swal({
                        html: data,
                        showCloseButton: true,
                        showCancelButton: false,
                        showConfirmButton: false,
                        onOpen: function () {
                            $('form').on('submit', function(e){
                                e.preventDefault();

                                $.fn.loadingIn();

                                $.ajax({
                                    method  : 'POST',
                                    url     : $('form').attr('action'),
                                    data    : $('form').serialize(),
                                    success : function (response) {
                                        if (false === response.status) {
                                            $.fn.Error('Algo malió sal!');
                                            $.fn.loadingOut();
                                            return;
                                        }

                                        $.fn.loadingOut();

                                        settings.callback(response);

                                        $.fn.modalHide();
                                    }
                                });
                            });
                            $.fn.loadingOut();
                        }
                    });
                }
            });


            /*
            var settings = $.extend($.fn.modalFormDefaults, options);

            if (settings.source === false) {
                return;
            }

            $.fn.loadingIn();

            $.ajax({
                method: settings.method,
                url: settings.source,
                data: settings.data,
                success: function (response) {
                    if (false === response.status) {
                        $.fn.Error('algo malió sal');
                        $.fn.loadingOut();
                    }

                    $.sweetModal({
                        content: response.data,
                        onOpen: function () {
                            $('form').on('submit', function(e){
                                e.preventDefault();

                                $.fn.loadingIn();

                                $.ajax({
                                    method  : 'POST',
                                    url     : $('form').attr('action'),
                                    data    : $('form').serialize(),
                                    success : function (response) {
                                        if (false === response.status) {
                                            alert('Algo malió sal!');
                                            $.fn.loadingOut();
                                            return;
                                        }

                                        settings.callback(response);

                                        $.fn.modalHide();
                                    }
                                });
                            });
                            $.fn.loadingOut();
                        }
                    });
                }
            });
            */

        },

        /**
         * Alert.
         * @param message
         * @constructor
         */
        Alert: function (message) {
            swal(message);
        },

        /**
         * Error.
         * @param message
         * @constructor
         */
        Error: function (message) {
            swal('Oops...', message, 'error');
        },

        /**
         *
         * @param title
         * @param message
         */
        Success: function (options) {
            var settings = $.extend($.fn.SuccessDefaults, options);
            swal({
                title: 'Buen trabajo!',
                text: settings.text,
                type: 'success',
                onClose: settings.onClose
            });
        },

        SuccessDefaults: {
            text: '',
            onClose: function () {}
        },

        /**
         * Confirm.
         * @param options
         * @constructor
         */
        Confirm: function (options) {
            var settings = $.extend($.fn.ConfirmDefaults, options);

            swal({
                title: settings.title,
                text: settings.text,
                type: 'warning',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: settings.preConfirm,
                onClose: settings.onClose
            }).then(function (response) {
                if (true === response) {
                    if (false === settings.message) {
                        $.fn.Exit();
                    }
                    if (false !== settings.message) {
                        $.fn.Success({
                            text: settings.message,
                            onClose: settings.onClose
                        });
                    }
                }
            });
        },

        ConfirmDefaults: {
            title: 'Confirm:',
            text: '',
            preConfirm: function () {
                return new Promise(function(resolve, reject) {
                    resolve();
                });
            },
            message: false,
            onClose: function() {}
        },



        /**
         * Close all modal windows.
         */
        modalHide: function () {
            $.sweetModal.storage.openModals.forEach(function (modal) {
                modal.close();
            });
        },

        modalFormDefaults: {
            source: false,
            method: 'GET',
            data: false,
            callback:   function(response) {
                console.log(response);
            },
        },
    });
})(jQuery);