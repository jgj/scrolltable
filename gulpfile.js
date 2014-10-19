var gulp = require('gulp'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');


gulp.task('scripts', function() {
    gulp.src('./scrolltable.js')
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(rename('scrolltable.min.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('styles', function() {
    gulp.src('./scrolltable.css')
        .pipe(cssmin({ keepSpecialComments: 1 }))
        .pipe(rename('scrolltable.min.css'))
        .pipe(gulp.dest('./dist'));
})

gulp.task('default', ['scripts', 'styles']);
