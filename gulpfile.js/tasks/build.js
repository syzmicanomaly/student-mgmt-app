var
    gulp = require('gulp'),
    gulpSequence = require('gulp-sequence')
;

gulp.task('build:production', function (cb) {
    process.env.NODE_ENV = 'production'; //TODO: not sure what this is for (copied in from gulp_starter project)
    gulpSequence('clean', 'webpack', cb);
});
