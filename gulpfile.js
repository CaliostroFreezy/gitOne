var gulp = require('gulp'),
	sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('assets/css/main.css')
		.pipe(minCSS())
		.pipe(gulp.dest('demo/css'));
});