var
    gulp = require('gulp'),
    del = require('del')
;

gulp.task('clean', function (cb) {
    del(["./build/resources"], cb); //TODO verify this is proper dir
});
