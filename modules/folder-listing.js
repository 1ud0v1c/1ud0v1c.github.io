var folders = [];
var fs = require('fs');

function folder_listing(options) {
    return function(files, metalsmith, done){
    	var source = metalsmith.source();
    	var metadata = metalsmith.metadata();

		fs.readdir(source, (err, files) => {
			files.forEach(file => {
				var file_path = source + "/" + file;
				if(isDirectory(file_path)) {
					folders.push(file);
				}
		  	});
			metadata.folders = folders;
		});

	    done();
    }
}

function isDirectory(directory) {  
	return fs.lstatSync(directory).isDirectory();
}

module.exports = folder_listing;