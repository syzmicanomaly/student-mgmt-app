/**
 * Exports function that will return object containing common config info for all build tasks (source directories,
 * build directories, etc.), based on an environment ('development', production').
 */

/**
 * @type {{join: Function, normalize: Function}}
 */
var path = require("path");

// these should be set in /gulpfile.js/index.js
if (!process.env.root_dir) {
    throw new Error("Can not run Gulp build; process.env.root_dir has not been set.");
}
if (!process.env.build_dir) {
    throw new Error("Can not run Gulp build; process.env.build_dir has not been set.");
}

var
    output = true,
    rootDir = path.normalize(process.env.root_dir),
    //TODO pull these out, send in as params (centralize in build.gradle)
    htmlSource = path.join(rootDir, "src/main/resources/static"),
    htmlBuild = path.join(rootDir, process.env.build_dir, "resources/main/static"),

    cssSource = path.join(rootDir, "src/main/resources/static/css"),
    cssBuild = path.join(rootDir, process.env.build_dir, "resources/main/static/css"),

    jsSource = path.join(rootDir, "/src/main/js"),
    jsBuild = path.join(rootDir, process.env.build_dir, "webpack/resources/js"),

    config = {
        rootDir: rootDir,
        sourceDir: jsSource,
        buildDir: jsBuild,

        htmlSource: htmlSource,
        cssSource: cssSource,
        jsSource: jsSource,

        htmlBuild: htmlBuild,
        cssBuild: cssBuild,
        jsBuild: jsBuild,
        resourceMain: path.join(process.env.build_dir, "resources")
    }
;

if (output) {
    function rtPad(str, len) {
        var pad = len - str.length;
        for (var i = 0; i < pad; i++) {
            str = str + " ";
        }
        return str;
    }

    var msg = "";
    Object.keys(config).forEach(function (el, i, array) {
        var val = config[el];
        msg += "   " + rtPad(el + ":", 20) + val;
        msg += "\n";
    });

    console.log(
        "\n" +
        "====================================================================================" + "\n" +
        "   Application Directories: " + "\n" +
        "   \n" +
        msg
    );
    output = false;
}

module.exports = config;
