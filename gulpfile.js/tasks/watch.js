var
    config = require("../config"),
    gulp = require('gulp'),
    watch = require('gulp-watch'),
    path = require("path");

gulp.task('watch', function () {
    function doWatch(base, extension, cb) {
        if (!base) {
            console.warn("No root directory specified for '" + extension + "' files, not watching.");
            return;
        }
        var files = path.normalize(base + extension);

        console.log("Watching files: " + files);
        watch(files, function () {
            console.log("Reloading files: " + files);
            cb(files);
        });
    }

    doWatch(config.jsSource, "/**/*.js", function (js) {
        process.env.DO_COPY = true; // will prompt copy of resources to proper build dir
        gulp.start('webpack');
    });
    doWatch(config.jsSource, "/**/*.jsx", function (js) {
        process.env.DO_COPY = true; // will prompt copy of resources to proper build dir
        gulp.start('webpack');
    });

    //TODO add support for watching other files

    //doWatch(config.cssSource, "/**/*.css", function (css) {
    //	gulp.start('css');
    //});
    //
    //doWatch(config.hbsSource, "/**/*.hbs", function (hbs) {
    //	console.log("Writing HBS files to: " + config.hbsBuild);
    //	gulp.src(hbs).pipe(gulp.dest(config.hbsBuild));
    //});
    //
    //doWatch(config.templateSource, "/**/*.html", function (templates) {
    //	console.log("Writing template files to: " + config.templateBuild);
    //	gulp.src(templates).pipe(gulp.dest(config.templateBuild));
    //});

});
