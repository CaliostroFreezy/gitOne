//Список переменных и плагинов
var gulp 		= require('gulp'),			
	sass 		= require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat		= require('gulp-concat'),
	uglify		= require('gulp-uglifyjs'),
	cssnano		= require('gulp-cssnano'),
	rename		= require('gulp-rename'),
	del			= require('del'),
	imagemin 	= require('gulp-imagemin'),
	pngquant	= require('imagemin-pngquant'),
	cache		= require('gulp-cache'),
	autoprefixer= require('gulp-autoprefixer');

//Список тасков
gulp.task('sass', function() {
	return	gulp.src('assets/sass/*.sass')
	.pipe(sass())
	.pipe(autoprefixer(['last 5 version', '>1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('assets/css'))
	.pipe(browserSync.reload({stream: true}));
});
// Подключение библиотек и сжатие в один файл
gulp.task('scripts', function() {
	return	gulp.src([
	'assets/libs/jquery/dist/jquery.min.js' ,
	'assets/libs/magnific-popup/dist/jquery.magnific-popup.min.js'	])
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('assets/js'));
});
// Сжимаем libs
gulp.task('css-libs', ['sass'], function() {
	return gulp.src('assets/css/libs.css')
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('assets/css'));
});
// Запускаем сервер
gulp.task('browser-sync', function () {
	browserSync({
		server:{
			baseDir: './'
		},
			notify: false //Убираем оповещения
	});
});

gulp.task('clean', function() {
	return del.sync('dist');
});

gulp.task('clear', function() {
	return cache.clearAll();
});

gulp.task('img', function() {
	return gulp.src('assets/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function () {
	gulp.watch('assets/sass/**/*.sass', ['sass']);
	gulp.watch('index.html', browserSync.reload);
	gulp.watch('assets/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([
		'assets/css/main.css',
		'assets/css/libs.min.css',])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('assets/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('assets/js/**/*')
	.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('./index.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['watch'])