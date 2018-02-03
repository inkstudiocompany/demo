'use strict'
/**
 * Gulp File
 * Version 1.0
 */

/*
 * Dependencies
 */
var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    pump        = require('pump'),
    composer    = require('gulp-uglify/composer'),
    uglifyjs    = require('uglify-es')
;

var minify = composer(uglifyjs, console);

/**
 * Destino de los archivos.
 * @type {string}
 */
var dest = '../web/bundles/beaver/backend/js';

/**
 * Lista de dependencias
 * @type {string[]}
 */
var thirdParty = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-validation/dist/jquery.validate.js',
    'node_modules/sweetalert2/dist/sweetalert2.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
];

/**
 * Copia las librerias de terceros.
 */
gulp.task('third-party-scripts', () => {
    gulp.src(thirdParty)
        .pipe(gulp.dest(dest))
    ;
});

/**
 * Compila los archivos de backend.
 */
gulp.task('javascript', ['third-party-scripts'], (response) => {
    pump([
        gulp.src([
            '../src/Beaver/BackendBundle/Resources/assets/**/*.js',
            '../vendor/Beaver/BackendBundle/Resources/assets/**/*.js'
        ]),
        concat('main.js'),
        minify(),
        gulp.dest(dest)
    ], response);
});

gulp.task('backend-scripts', ['javascript']);