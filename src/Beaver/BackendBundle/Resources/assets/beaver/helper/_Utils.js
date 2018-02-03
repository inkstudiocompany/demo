'use strict';

/**
 * Utils package.
 * 
 * @type {{}}
 * @private
 */
let _Utils = {
    /**
     * Loader In.
     */
    loaderIn: () => {
        $('#loading').removeClass('out in').addClass('in');
    },

    /**
     * Loader Out.
     */
    loaderOut: () => {
        $('#loading').removeClass('out in').addClass('out');
    },
};
