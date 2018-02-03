(function ($) {
    $.fn.extend({
        /**
         * Add the admin bars for blocks.
         * @returns {*}
         */
        slotAdminBarSetup: function () {
            return this.each(function () {
                let id = $(this).data('id');
                let htmlAdminBar = $(this).find('.slot-admin-buttons');
                let actionButton = $(htmlAdminBar).find('.slot-action-button');

                if ('add-widget' === actionButton.data('rel')) {
                    actionButton.off('click').on('click', $.fn.addWidget);
                }
                if ('drop-widget' === actionButton.data('rel')) {
                    actionButton.off('click').on('click', $.fn.dropWidget);
                }

                $(htmlAdminBar).removeClass('beaver-mockup');

                $(this).prepend(htmlAdminBar);
            });
        },

        /**
         * Save the widget.
         */
        addWidget: function () {
            $.fn.loadingIn();

            let block = false; let slot = 0; let size = 0;

            let slotButtonBar   = $(this).parents('[data-beaver="slot"]');
            let blockHtml       = $(this).parents('[data-beaver="block"]');

            if (slotButtonBar.length) {
                slot    = slotButtonBar.data('id');
                size    = slotButtonBar.data('size');
            }

            if (blockHtml.length) {
                block = blockHtml.data('id');
            }

            $.fn.modalForm({
                method: 'GET',
                source: $.fn.endpoints.widgets_form,
                data: 'block=' + block + '&size=' + size + '&slot=' + slot,
                callback: function (response) {
                    if (false === response.status) {
                        $.fn.Error('Algo malió sal!');
                        $.fn.loadingOut();
                        return;
                    }
                    $.fn.modalHide();
                    $.fn.Success({
                        text: 'El widget se agregó correctamente!',
                        onClose: function () {
                            $.fn.refreshBlock(block);
                        }
                    });
                }
            });
        },

        /**
         * Delete widget
         */
        dropWidget: function () {
            let widget  = $(this).data('id');
            let block = false;

            let blockHtml = $(this).parents('[data-beaver="block"]');
            if (blockHtml.length) {
                block = blockHtml.data('id');
            }

            $.fn.Confirm({
                title: 'Eliminar Widget',
                text: 'Esta acción eliminará el widget de la página. Esta seguro que desea continuar?',
                message: 'El widget se ha eliminado correctamente!',
                preConfirm: function () {
                    return new Promise(function(resolve, reject) {
                        $.ajax({
                            method: 'DELETE',
                            url:    $.fn.endpoints.widgets,
                            data:   'widget=' + widget,
                            success: function (response) {
                                if (false === response.status) {
                                    $.fn.Error('Algo malió sal!');
                                    reject();
                                    return;
                                }
                                resolve();
                            }
                        });
                    });
                },
                onClose: function () {
                    $.fn.refreshBlock(block);
                }
            });
        }

    });
})(jQuery);