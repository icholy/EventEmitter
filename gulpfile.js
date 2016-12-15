
var gulp       = require('gulp'),
    karma      = require('karma').server,
    rimraf     = require('rimraf'),
    uglify     = require('gulp-uglify'),
    typedoc    = require('gulp-typedoc'),
    tslint     = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    typescript = require('gulp-typescript');

var baseTypeScriptTask = function () {
  return gulp.src('src/*.ts');
};

gulp.task('build', function () {
  var tsResult = baseTypeScriptTask()
      .pipe(sourcemaps.init())
      .pipe(typescript({
        target: 'ES5',
        declarationFiles: true,
        noExternalResolve: true
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('build'));
});

gulp.task('lint', function () {
  return baseTypeScriptTask()
      .pipe(tslint())
      .pipe(tslint.report('verbose'))
});

gulp.task('docs', function (done) {
  return baseTypeScriptTask()
      .pipe(typedoc({ out: "docs/" }));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('clean', function () {
  var noop = function () {};
  rimraf('docs/', noop);
  rimraf('build/', noop);
});

gulp.task('dist', ['lint', 'docs', 'build']);
gulp.task('default', ['dist']);

