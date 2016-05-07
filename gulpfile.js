"use strict";

var gulp = require('gulp'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    connectLivereload = require('connect-livereload'),
    gulpLivereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint');

var path = {
   src: 'src/',
  html: 'src/**/*.html',
    js: 'src/js/*.js',
  sass: 'src/sass/**/*.scss',
   css: 'src/css/',
}

var localPort = 4000,
       lrPort = 35729;

gulp.task('server', function(){
  var server = connect();

  server.use(connectLivereload({port: lrPort}));
  server.use(serveStatic(path.src));
  server.listen(localPort);

  console.log("\nlocal server running at http://localhost:" + localPort + "/\n");
});

gulp.task('sass', function(){
  gulp.src(path.sass)
    .pipe(sass({
      outputStyle: [ 'expanded' ],
      sourceComments: 'normal'
    }).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest(path.css))
    .pipe(gulpLivereload());
})

gulp.task('jshint', function(){
  gulp.src(path.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulpLivereload());
});

gulp.task('html', function(){
  gulp.src(path.html)
    .pipe(gulpLivereload());
});

gulp.task('watch', function(){
  gulp.watch(path.sass, ['sass']);
  gulp.watch(path.js, ['jshint']);
  gulp.watch(path.html, ['html']);

  gulpLivereload.listen();
})

gulp.task('default', ['server', 'watch']);