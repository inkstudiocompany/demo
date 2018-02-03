'use strict';

/**
 * Blocl Setup Admin Bar.
 *
 * @type {{}}
 * @private
 */
let _Block = {
    /**
     * Adds Buttons bar for each block.
     *
     * @param selector
     * @constructor
     */
    Setup: (selector) => {
        $(selector).each(function () {
            $(this).find('.block-admin-buttons').remove();

            let id      = $(this).data('id');
            let status  = $(this).data('status');

            let $bar = $('.block-admin-buttons.beaver-mockup').clone();

            $bar.find('button').each(function () {
                $(this).data('id', id);

                if ('publish' === $(this).data('rel')) {
                    $(this).data('published', status);
                    $(this).find('i.fa').removeClass('fa-check-circle-o fa-times-circle-o');
                    $(this).removeClass('unpublished, published');

                    if (0 === status) {
                        $(this).find('i.fa').addClass('fa-times-circle-o');
                        $(this).addClass('unpublished');
                    }
                    if (1 === status) {
                        $(this).find('i.fa').addClass('fa-check-circle-o');
                        $(this).addClass('published');
                    }
                }
            });

            $bar.removeClass('beaver-mockup');

            $(this).prepend($bar);

            // Set buttons.
            let refreshButton   = $(this).find('[data-rel="refresh"]');
            let moveDownButton  = $(this).find('[data-rel="move-down"]');
            let moveUpButton    = $(this).find('[data-rel="move-up"]');
            let dropButton      = $(this).find('[data-rel="drop"]');
            let publishButton   = $(this).find('[data-rel="publish"]');

            moveDownButton.off('click').on('click', _Block.Move);
            moveUpButton.off('click').on('click', _Block.Move);
            dropButton.off('click').on('click', $.fn.dropBlock);
            refreshButton.off('click').on('click', _Block.Refresh);
            publishButton.off('click').on('click', _Block.Publish);

            _Block.DisableMoveButtons();
        });
    },

    /**
     * Publish/Unpublish a Block.
     *
     * @constructor
     */
    Publish: function () {
        _Utils.loaderIn();

        let $block = $(this).parents('[data-beaver="block"]');
        let id = $block.data('id');

        // 1 - Published || 0 - Unpublished
        let status  = parseInt($block.data('status'));

        if (1 === status) {
            _Utils.loaderOut();
            _Modal.Confirm({
                text: 'Are you sure?',
                callback: () => {
                    _Http.Put({
                        url         :    $.fn.endpoints.blocks + '/' + id + '/publish',
                        callback    : (data) => {
                            $('#block-' + id).replaceWith(data);
                            beaver.Setup();
                            _Utils.loaderOut();
                        }
                    });
                }
            });
        }

        if (0 === status) {
            _Http.Put({
                url         :    $.fn.endpoints.blocks + '/' + id + '/publish',
                callback    : (data) => {
                    $('#block-' + id).replaceWith(data);
                    beaver.Setup();
                    _Utils.loaderOut();
                }
            });
        }
    },

    /**
     * Reload Block.
     *
     * @constructor
     */
    Refresh: function (block) {
        _Utils.loaderIn();

        let id = block;
        if (!block) {
            let $block = $(this).parents('[data-beaver="block"]');
            let id = $block.data('id');
        }

        _Http.Get({
            url         :    $.fn.endpoints.blocks,
            data        :   'block=' + id,
            callback    :   (data) => {
                $('#block-' + id).replaceWith(data);
                beaver.Setup();
                _Utils.loaderOut();
            }
        });
    },

    /**
     * Disable move buttons of first and last Blocks.
     *
     * @constructor
     */
    DisableMoveButtons: function () {
        // Disable Move Buttons
        $('[data-beaver="block"]')
            .find('[data-rel="move-down"], [data-rel="move-up"]').attr('disabled', false);
        $('[data-beaver="block"][data-order="1"]')
            .find('[data-rel="move-up"]').attr('disabled', true);
        $('[data-beaver="block"][data-order="1"]').parent()
            .find('[data-beaver="block"]:last')
            .find('[data-rel="move-down"]').attr('disabled', true);
    },

    /**
     * Change Block Vertical Position.
     *
     * @constructor
     */
    Move: function () {
        _Utils.loaderIn();

        let $block = $(this).parents('[data-beaver="block"]');

        let $blockToMove     = $block;
        let $blockToReplace  = $blockToMove.next('[data-beaver="block"]');

        if ('move-up' === $(this).data('rel')) {
            $blockToReplace = $blockToMove.prev('[data-beaver="block"]');
        }

        $actionButton = $(this);
        _Http.Put({
            url: $.fn.endpoints.blocks + '/' + $blockToMove.data('id') + '/move/' + $blockToReplace.data('id'),
            callback: (data) => {
                let reorder = function () {
                    $blockToMove.parent().find('[data-beaver="block"]')
                        .each(function () {
                            $(this).attr('data-order', $(this).index() + 1);
                        });

                    _Block.DisableMoveButtons();
                };

                if ('move-up' === $actionButton.data('rel')) {
                    $.when($blockToMove.insertBefore($blockToReplace)).then(reorder);
                }

                if ('move-down' === $actionButton.data('rel')) {
                    $.when($blockToMove.insertAfter($blockToReplace)).then(reorder);
                }

                _Utils.loaderOut();
            }
        });
    },

    /**
     * Drop a Block.
     *
     * @constructor
     */
    Delete: function () {
        let $id = $(this).data('id');

        _Modal.Confirm({
            title   : 'Eliminar bloquecito',
            text    : 'Are you sure?',
            callback: function () {
                _Utils.loaderIn();

                _Http.Delete({
                    url         : $.fn.endpoints.blocks,
                    data        : 'block=' + block,
                    message     : 'Buena esa!',
                    callback    : (data) => {
                        $('#block-' + $id).fadeOut(750, 'swing', function () {
                            $.when($(this).remove())
                                .then(function () {
                                    $('.beaver-block').each(() => {
                                        $(this).attr('data-order', $(this).index() + 1);
                                    });
                                    _Block.DisableMoveButtons();
                                });
                        });

                        _Utils.loaderOut();
                    }
                });
            }
        });
    }
};
