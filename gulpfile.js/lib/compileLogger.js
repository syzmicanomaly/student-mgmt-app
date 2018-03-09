var
    gutil = require("gulp-util"),
    prettifyTime = require('./prettifyTime'),
    handleErrors = require('./handleErrors')
;

module.exports = function (err, stats) {
    //console.log("Call to compileLogger", err, stats); //this is VERY verbose
    if (err) {
        throw new gutil.PluginError("webpack", err);
    }

    var statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';

    if (stats.compilation.errors.length > 0) {
        stats.compilation.errors.forEach(function (error) {
            handleErrors(error);
            statColor = 'red'
        })
    } else {
        var compileTime = prettifyTime(stats.endTime - stats.startTime);
        gutil.log(gutil.colors[statColor](stats));
        gutil.log('Compiled with', gutil.colors.cyan('webpack'), 'in', gutil.colors.magenta(compileTime))
    }
};
