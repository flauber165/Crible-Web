'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var webpack = require('webpack-stream');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        },
        options: {
            reloadDelay: 250
        },
        port: 8000,       
        notify: false
    });
});

gulp.task('script', function() {
    return gulp.src([ 
        './node_modules/core-js/client/shim.min.js',
        './node_modules/zone.js/dist/zone.js',
        './node_modules/reflect-metadata/Reflect.js',       
        './app/scripts/main.ts'
    ])
    .pipe(webpack({
        output: {
            filename: 'script.js'
        },        
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
        },
        module: {
            loaders: [
                { test: /\.ts$/, loader: 'ts-loader' },
            ]
        }       
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));      
});

gulp.task('style', function () {
    return gulp.src('./app/styles/**/*.scss')
    .pipe(sass({
        errLogToConsole: true
    }))
    .pipe(autoprefixer({
        browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        cascade:  true
    })).on('error', sass.logError)    
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({stream: true}));    
});

gulp.task('fonts', function() {
    return gulp.src(['./node_modules/font-awesome/fonts/**/*.*'])
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('views', function() {
    return gulp.src(['./app/views/**/*.*'])
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch('./app/views/**/*.*', ['views']);
  gulp.watch('./app/scripts/**/*.ts', ['script']);
  gulp.watch('./app/styles/**/*.scss', ['style']);
});

gulp.task('default', ['script', 'style', 'views', 'fonts', 'watch', 'browser-sync']);