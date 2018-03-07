var
    config = require('../config/webpack'),
    mainConfig = require('../config'),
    gulp = require('gulp'),
    logger = require('../lib/compileLogger'),
    webpack = require('webpack'),
    copy = require("copy")
;

gulp.task('webpack', function (callback) {
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

        if (process.env.DO_COPY) {
            console.log("---------------------------------------------------------------");
            //TODO pull these out, send in as params (centralize in build.gradle)
            console.log("Copy from: " + mainConfig.buildDir);
            console.log("Copy to: " + mainConfig.rootDir + "/build/resources/main/static/js");
            copy(mainConfig.buildDir + "/*", mainConfig.rootDir + "/build/resources/main/static/js", function (err, files) {
                console.log("Files were copied: ", files); //TODO improve log output
            });
            process.env.DO_COPY = false;
        }

    });

});
