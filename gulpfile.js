var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    gulpif = require('gulp-if'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect');

var environment,
    jsSources,
    jsonSources,
    htmlSources,
    outputDir,
    cssSources;

environment = 'development';

if (environment==='development') {
  outputDir = 'builds/development/';
} else {
  outputDir = 'builds/production/';
}

jsSources = ['components/js/*.js'];
htmlSources = ['components/html/*.html'];
cssSources = ['components/css/*.css'];
jsonSources = ['components/js/*.json'];
imageSources = ['components/images/*.*']

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpif(environment === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir)))
    .pipe(connect.reload())
});

gulp.task('css', function() {
  gulp.src(cssSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'css/')))
    .pipe(connect.reload())
});

gulp.task('images', function() {
  gulp.src(imageSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'images/')))
    .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(jsonSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'js/')))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(cssSources, ['css']);
  gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
  connect.server({
    root: outputDir,
    livereload: true
  });
});

gulp.task('run', ['js','html','css','json','images','connect', 'watch']);
