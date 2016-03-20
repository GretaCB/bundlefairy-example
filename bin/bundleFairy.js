#!/usr/bin/env node

// This is bundleFairy's executable script,
// meaning it can be executed from the terminal/console
// This is assigned within package.json, in the "bin" property

// This executable script will have a few main jobs:
// 1. validate arguments passed in from console
// 2. provide info on usage in case of invalid arguments
// 3. check if file is a bundle
//             OR
// 4. extract zipfile

// require('..') is just another way of saying require('../index.js')
var bundleFairy = require('..');

function usage() {
  console.error('Usage: bundle-fairy <isbundle|extract> <zipfile>');
  console.error('');
  console.error('Options:');
  console.error(' -o, --outdir: specify an output file path');
  console.error(' -h, --help: show this message');
  console.error('');

  process.exit(1);
}

// Grab the arguments passed into this executable
// "args" becomes an array, where each index holds an argument that was passed in.
// They are indexed in the same order they were passed in
var args = require('minimist')(process.argv.slice(2));

if (args.h || args.help) usage();

// Assign the first argument (the zip filepath) to a variable
var filepath = args._[0];

// if user calls bundle-fairy isbundle
bundleFairy.isbundle(filepath, function(err, result) {
  if (err) return fail(err);
  // bundleFairy will log the result to the console
  console.log(result);
});

// if user calls bundle-fairy extract
bundleFairy.extract(filepath, outdir, function(err, uri) {
	if (err) return fail(err);
	// bundleFaity will log the extracted directory uri to the console
	console.log(uri);
});

// A fail function that will output a message to the console (some kind of help message).
// Executables exit with an "exit code". Exit code 0 means success. Any other code means an error of somekind.
// If fail() is called, it will set the exit code to 1, which means an error occurred. These can be customized a bit
// depending on if you want to have different logic for different error codes. For now, lets start with exit 1.
function fail(err) {
  if (!args.quiet) usage();
  console.error(err.message);
  process.exit(1);
}