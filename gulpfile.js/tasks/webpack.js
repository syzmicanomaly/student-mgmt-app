var
    config = require('../config/webpack'),
    gulp = require('gulp'),
    logger = require('../lib/compileLogger'),
    webpack = require('webpack')
;

gulp.task('webpack:production', function (callback) {
    var compiler = webpack(config);
    compiler.run(function (err, stats) {
        logger(err, stats);
        var jsonStats = stats.toJson();
        if (err || jsonStats.errors.length > 0) {
            process.exit(1);
            return;
        }
        if (jsonStats.warnings.length > 0) {
            //TODO
        }
        callback();
    });

});
