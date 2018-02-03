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
    uglifycss   = require('gulp-uglifycss'),
    sass        = require('gulp-sass')
;

/**
 * Destino de los archivos.
 * @type {string}
 */
var dest = '../public/bundles/beaver/backend/css';

/**
 * Lista de dependencias
 * @type {string[]}
 */
var thirdParty = [
    'node_modules/font-awesome/css/font-awesome.min.css',
    'node_modules/animate.css/animate.min.css',
    'node_modules/sweetalert2/dist/sweetalert2.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/bootstrap/dist/css/bootstrap-grid.min.css'
];

/**
 * Copia las librerias de terceros.
 */
gulp.task('third-party-styles', () => {
    gulp.src(thirdParty)
        .pipe(gulp.dest(dest))
    ;
});

/**
 * Compila los archivos de backend.
 */
gulp.task('styles', ['third-party-styles'], (response) => {
    pump([
        gulp.src([
            '../src/Beaver/BackendBundle/Resources/assets/**/*.scss',
            '../vendor/Beaver/BackendBundle/Resources/assets/**/*.scss'
        ]),
        sass().on('error', sass.logError),
        concat('styles.css'),
        uglifycss(),
        gulp.dest(dest)
    ], response);
});

gulp.task('backend-styles', ['styles']);