'use strict';

/**
 * Define prototype.
 *
 * @type {{}}
 * @private
 */
let _Area = {
    /**
     * Define HTML for Area Buttons Bar.
     *
     * @returns {string}
     * @constructor
     */
    ButtonBar: function () {
        return '<div class="area-admin-buttons" data-page="" data-area="">\n' +
            '        <button title="Add Block" data-rel="add-block">\n' +
            '            <i class="fa fa-plus-circle"></i>\n' +
            '        </button>\n' +
            '    </div>';
    },

    /**
     * Adds Buttons bar for each block.
     *
     * @param selector
     * @constructor
     */
    Setup: (selector) => {
        $(selector).each(function () {
            $(this).find('.area-admin-buttons').remove();

            let area = $(this).attr('id');
            let page = $(this).data('page');

            let $bar = $(_Area.ButtonBar()).data('beaver', area).data('page', page);
            $bar.find('[data-rel="add-block"]').off('click').on('click', _Area.Add);
            $(this).append($bar);
        });
    },

    /**
     * Adds New Block into Area.
     *
     * @param e
     * @constructor
     */
    Add: function () {
        _Utils.loaderIn();

        let page = $(this).parents('.area-admin-buttons').data('page');
        let area = $(this).parents('.area-admin-buttons').data('beaver');

        _Modal.Form({
            url:        $.fn.endpoints.blocks + '/form',
            data: 'page=' + page + '&area=' + area,
            callback: function () {
                $('form#block_form').on('submit', () => {
                    return false;
                });

                _Utils.loaderIn();

                _Http.Post({
                    url: $.fn.endpoints.blocks,
                    data: $('form#block_form').serialize(),
                    callback: function (data) {
                        let block = $(data);
                        $('.area-admin-buttons[data-area="'+area+'"]').before(block);
                        beaver.Setup();
                        _Modal.Close();
                    }
                });
            }
        });
    }
};
