'use strict';

/**
 * Slots.
 *
 * @type {{}}
 * @private
 */
let _Slot = {
    Setup: (selector) => {
        $(selector).each(function () {
            let id = $(this).data('id');
            let $htmlAdminBar = $(this).find('.slot-admin-buttons');
            let $actionButton = $($htmlAdminBar).find('.slot-action-button');

            if ('add-widget' === $actionButton.data('rel')) {
                $actionButton.off('click').on('click', _Widget.Add);
            }
            if ('drop-widget' === $actionButton.data('rel')) {
                $actionButton.off('click').on('click', $.fn.dropWidget);
            }

            $($htmlAdminBar).removeClass('beaver-mockup');

            $(this).prepend($htmlAdminBar);
        });
    },
};
