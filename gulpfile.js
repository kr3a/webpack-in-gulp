const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const htmlmin = require('gulp-htmlmin');
// const imagemin = require('gulp-imagemin');
const webpack = require('gulp-webpack');


// Manual Reloading
gulp.task('server', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/js/**/*.js").on('change', gulp.parallel('scripts'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts')); //all значит мы будем реагировать на любые действия которые были произведены с этими файлами
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));   
});

gulp.task('scripts', function () {
    return gulp.src("src/js/script.js")
        .pipe(webpack( require('./webpack.config.js') ))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream()); //при изменении и копировании на шего файла наша страница в браузере перезагрузится
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        // .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));