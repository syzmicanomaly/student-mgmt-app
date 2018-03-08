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
        //TODO make this a cmd line flag?
        cb(files);
    }

    doWatch(config.jsSource, "/**/*.js", function (js) {
        process.env.DO_COPY = true; // will prompt copy of resources to proper build dir
        gulp.start('webpack');
    });
    doWatch(config.jsSource, "/**/*.jsx", function (js) {
        process.env.DO_COPY = true; // will prompt copy of resources to proper build dir
        gulp.start('webpack');
    });
    doWatch(config.htmlSource, "/**/*.html", function (html) {
    	console.log("Writing HTML files to: " + config.htmlBuild);
    	gulp.src(html).pipe(gulp.dest(config.htmlBuild));
    });
    doWatch(config.cssSource, "/**/*.css", function (css) {
        console.log("Writing CSS files to: " + config.cssBuild);
        gulp.src(css).pipe(gulp.dest(config.cssBuild));
    });

});
