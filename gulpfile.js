var gulp = require('gulp'),
	sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('assets/sass/main.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('demo/css'));
});