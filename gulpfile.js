var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    babel = require('gulp-babel'),
    ts = require('gulp-typescript'),
    strip = require('gulp-strip-comments');

var tsProject = ts.createProject("tsconfig.json");

gulp.task('type', function () {
    return gulp.src('dev/')
});

// Styles
gulp.task('styles', function () {
    return gulp.src('dev/styl/main.styl')
        .pipe(stylus())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(concat('main.css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('web/css'))
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

gulp.task('ts', () =>
    gulp.src('dev/ts/**/*.ts')
    .pipe(tsProject())
    .pipe(rename({
        suffix: '.min'
    }))
    //.pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('web/scripts'))
    .pipe(notify({
        message: 'Scripts task complete'
    }))
);

// Clean
gulp.task('clean', function () {
    del(['web/css', 'web/scripts'])
});

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start(['styles', 'ts']);
});

// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('dev/styl/**/*.styl', ['styles']);

    // Watch .ts files
    gulp.watch('dev/ts/**/*.ts', ['ts']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['web/**']).on('change', livereload.changed);

});