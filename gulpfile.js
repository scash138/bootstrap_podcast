var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    gulpif = require('gulp-if'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    convert = require('gulp-convert'),
    connect = require('gulp-webserver');

var environment,
    jsSources,
    jsonSources,
    htmlSources,
    outputDir,
    rssFeed,
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
imageSources = ['components/images/'];
audioSources = ['components/audio/*.mp3'];
rssFeed = ['components/rss/*.rss'];



// gulp.task('convertjson', function(){
//   gulp.src(['components/js/podcasts.json'])
//     .pipe(convert({
//       from: 'json',
//       to: 'xml'
//      }))
//     .pipe(gulp.dest('components/rss/'));
// });
gulp.task('rss', function() {
  gulp.src(rssFeed)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'rss/')))
});


gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(gulp.dest(outputDir + 'js'))
});

gulp.task('audio', function() {
  gulp.src(audioSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'audio/')))
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir)))
});

gulp.task('css', function() {
  gulp.src(cssSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'css/')))
});

gulp.task('images', function() {
  gulp.src(imageSources + '*.*')
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'images/')))
  gulp.src(imageSources + '*/*.*')
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'images/')))
});

gulp.task('json', function() {
  gulp.src(jsonSources)
    .pipe(gulpif(environment === 'development', gulp.dest(outputDir + 'js/')))
});

gulp.task('watch', function() {
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(cssSources, ['css']);
  gulp.watch(jsonSources, ['json']);
  gulp.watch(imageSources, ['images']);
  gulp.watch(audioSources, ['audio']);
  gulp.watch(rssFeed, ['rss']);
});

gulp.task('connect', function() {
  gulp.src(outputDir)
    .pipe(connect({
      livereload: true,
      open: true
    }));
});

gulp.task('run', ['js','html','css','json','images','audio','connect','rss','watch']);
