var Metalsmith  = require('metalsmith');

// transpile all md into html
var markdown    = require('metalsmith-markdown');
// wrap layouts around html
var layouts     = require('metalsmith-layouts');
// change URLs to permalink URLs
var permalinks  = require('metalsmith-permalinks');
// manages to load assets (CSS, images...)
var assets = require('metalsmith-assets');
// Load our custom plugin to list folder in contents
var folders = require('./modules/folder-listing.js');

Metalsmith(__dirname).metadata({
    title: "Reminder",
    description: "Just some reminders.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
}).source('./contents')
    .destination('./build')
    .clean(true)
    .use(folders())
    .use(permalinks({
        relative: false,
	   pattern: ':title',
    }))
    .use(markdown())
    .use(layouts({
        engine: "jade",
        directory: "./templates",
        pattern: ["*/*/*html","*/*html","*html"]
    }))
    .use(assets({
        source: './assets'
    }))
    .build(function(err, files) {
        if (err) { 
          throw err; 
        }
    }
);