/*
 gulpfile.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulpfile.js/tasks. Any files in that directory get
 automatically required below.

 To add a new task, simply add a new task file that directory.
 gulpfile.js/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */

var
	gulp = require('gulp'),
	gutil = require('gulp-util'),
	taskListing = require("gulp-task-listing"),
	requireDir = require('require-dir'),
	path = require("path")
;

var
	initGulpTask = "default",
	args = process.argv.slice(2)
;

for (var i = 0; i < args.length; i++) {
	var item = args[i];
	switch (item) {
		case "--root-dir":
			process.env.root_dir = args[i + 1];
			break;
		case "--task":
			initGulpTask = args[i + 1];
			break;
		case "--local-webserver":
			process.env.local_webserver = args[i + 1];
			break;
		case "--artifact-dir":
			process.env.artifact_dir = args[i + 1];
			break;
	}
}

process.env.build_dir = "build";

// Require all tasks in gulp/tasks, including subfolders
requireDir('./tasks', {
	recurse: true
});

gutil.log(
	"\n" +
	"====================================================================================" + "\n" +
	"   Hire Enterprise Gulp Config:    " + "\n" + "   \n" +
	"   root-dir:            " + process.env.root_dir + "\n" +
	"   build-dir:           " + process.env.build_dir + "\n" +
	"   artifact-dir:        " + process.env.artifact_dir + "\n" +
	"   init-gulp-task:      " + initGulpTask + "\n"
);

// Add a task to render the output
gulp.task("help", taskListing);
gutil.log(
	"\n" +
	"====================================================================================" + "\n" +
	"   Hire Enterprise Gulp Tasks: " + "\n"
);
gulp.start("help");

if (initGulpTask && initGulpTask != 'null') {
	gutil.log("Executing task '" + initGulpTask + "'");
	gulp.start(initGulpTask)
}
