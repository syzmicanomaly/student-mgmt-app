var
    gulp = require('gulp'),
    gulpSequence = require('gulp-sequence')
;

gulp.task('build', function (cb) {
    process.env.NODE_ENV = 'production'; //TODO set via build params
    gulpSequence(/*'clean', */'webpack', cb); //TODO fix clean
});
