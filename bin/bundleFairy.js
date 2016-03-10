#!/usr/bin/env node

// This is bundleFairy's executable script,
// meaning it can be executed from the terminal/console
// This is assigned within package.json, in the "bin" property

// require('..') is just another way of saying require('../index.js')
var bundleFairy = require('..');

// Grab the arguments passed into this executable
// "args" becomes an array, where each index holds an argument that was passed in.
// They are indexed in the same order they were passed in
var args = require('minimist')(process.argv.slice(2));

// Assign the first argument (the zip filepath) to a variable
var filepath = args._[0];


bundleFairy(filepath, function(err, result) {
  if (err) return fail(err);
  // bundleFairy will log the result to the console
  console.log(result);
});

// A fail function that will output a message to the console (some kind of help message).
// Executables exit with an "exit code". Exit code 0 means success. Any other code means an error of somekind.
function fail(err) {
  if (!args.quiet) console.log('Usage: shapefile-fairy <path to zipped shapefile>');
  console.error(err.message);
  process.exit(err.code === 'EINVALID' ? 3 : 1);
}