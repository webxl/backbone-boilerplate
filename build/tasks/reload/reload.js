// ============================================================================
// TASKS
// ============================================================================

task.registerBasicTask("reload", "Reload connected clients.", function (data, name) {
	// Minify CSS.
	var errorcount = fail.errorcount;
	var files = file.expand(data);
	file.write(name, task.helper('reload', files));

	// Fail task if there were errors.
	if (fail.errorcount > errorcount) {
		return false;
	}

	// Otherwise, print a success message.
	log.writeln("File \"" + name + "\" created.");
});

// ============================================================================
// HELPERS
// ============================================================================

task.registerHelper("reload", function (files) {
	var http = require('http');

	var fileData = JSON.stringify(files);

	var options = {
		host:'localhost',
		port:8000,
		method:'POST',
		path:'/reload',
		headers:{
			'Content-Type':'application/x-www-form-urlencoded',
			'Content-Length':fileData.length
		}
	};

	var post_req = http.request(options,
					function (proxyResponse) {}).on('error', function (e) {
						console.log("Got error: " + e.message);
					});

	post_req.write(fileData);
	post_req.end();

});

