'use strict';

/**
 * Gulp Dependencies.
 * @type {Gulp|*}
 */
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    pump        = require('pump'),
    composer    = require('gulp-uglify/composer'),
    uglifyjs    = require('uglify-es')
;

var minify = composer(uglifyjs, console);

/**
 * Public path.
 *
 * @type {string}
 */
var dest = '../public/bundles/beaver/js';

/**
 * Define third party dependencies.
 *
 * @type {string[]}
 */
var vendors = [
    'node_modules/sweetalert2/dist/sweetalert2.js'
];

/**
 * Define dependecies for framework.
 *
 * @type {string[]}
 */
var helpers = [
    '../src/Beaver/BackendBundle/Resources/assets/beaver/helper/*.js',
];

gulp.task('beaver-helpers', (response) => {
    pump([
        gulp.src(vendors.concat(helpers)),
        concat('beaver.helpers.min.js'),
        // minify(),
        gulp.dest(dest + '/helpers')
    ], response);
});

/**
 * Compile framework.
 */
gulp.task('beaver-framework', ['beaver-helpers'], (response) => {
    pump([
        gulp.src([
            '../src/Beaver/BackendBundle/Resources/assets/beaver/*.js'
        ]),
        concat('beaver.min.js'),
        // minify(),
        gulp.dest(dest)
    ], response);
});
