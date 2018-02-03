'use strict';

/**
 * Define prototype.
 *
 * @type {{}}
 * @private
 */
let _Widget = {
    Add: function () {
        _Utils.loaderIn();

        let block = false; let slot = 0; let size = 0;

        let $slotButtonBar   = $(this).parents('[data-beaver="slot"]');
        let $blockHtml       = $(this).parents('[data-beaver="block"]');

        if ($slotButtonBar.length) {
            slot    = $slotButtonBar.data('id');
            size    = $slotButtonBar.data('size');
        }

        if ($blockHtml.length) {
            $block = $blockHtml.data('id');
        }

        _Modal.Form({
            source: $.fn.endpoints.widgets_form,
            data: 'block=' + block + '&size=' + size + '&slot=' + slot,
            callback: function (response) {
                _Modal.Close();
                _Modal.Success({
                    text: 'El widget se agregó correctamente!',
                    onClose: function () {
                        _Block.Refresh($block);
                    }
                });
            }
        });
    }
};
