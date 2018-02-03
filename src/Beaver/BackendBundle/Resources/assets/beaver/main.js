'use strict';

/**
 * Declare beaver like global context.
 */
((global) => {
    /**
     * Define main object.
     *
     * @type {{version: string}}
     */
    global.beaver = {
        /**
         * Framework version.
         */
        version: '1.0',

        /**
         * Http Utilities.
         */
        Http: _Http,

        /**
         * Modal Utilities.
         */
        Modal: _Modal,

        /**
         * Forms Utilities.
         */
        Form: _Form,

        Setup: () => {
            _Area.Setup('[data-beaver="area"]');
            _Block.Setup('[data-beaver="block"]');
            _Slot.Setup('[data-beaver="slot"]');
        }
    };
}).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});