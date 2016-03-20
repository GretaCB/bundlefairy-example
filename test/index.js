// These are setting up all of the dependencies this file will need to use
var test = require('tape').test;
var fixtures = require('./fixtures');
var path = require('path');
var bundleFairy = require('..');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

test('valid bundle', function(t) {
  // Setup your valid fixture
  var fixture = path.resolve(fixtures, 'valid.zip');
  
  // Pass the valid fixture as an argument into bundleFairy
  bundleFairy.isbundle(fixture, function(err, output) {
    // Let's check to see what bundleFairy returned
    
    // We are not expecting an error. 
    // So if bundleFairy returns an error, throw it
    if (err) throw err;
    
    // Phew! didnt get an error. Onto the assertions.
    // We want to make sure that what was returned is what we expect
    
    // Assert that output equals true, 
    // since this test is testing a valid zipfile
    t.equal(output, true, 'woohoo! test successful');

    // Make sure to explicitly end each test
    t.end();

  });
});

test('invalid bundle', function(t) {
  // Setup an invalid fixture
  var fixture = path.resolve(fixtures, 'invalid.txt');
  
  // Pass the invalid fixture as an argument into bundleFairy
  bundleFairy.isbundle(fixture, function(err, output) {
    
    // In this case, we are expecting an error
    t.ok(err, 'expected error');
    
    // Check for expected error message
    t.equal(err.message, 'not a zip file!');
    
    // Explicitly end test
    t.end();

  });
});


// Now lets test our executable file (bin/bundleFairy.js)
test('executable script: valid case', function(t) {
  // Setup your valid fixture
  var valid_fixture = path.resolve(fixtures, 'valid.zip');

  // Setup command, as if it were being called from the console
  var valid = [
    path.resolve(__dirname, '..', 'bin', 'bundleFairy.js'),
    valid_fixture
  ].join(' ');

  // Here, we are using node's child_process tool to trigger
  // bundleFairy as if we were executing it from the command line
  exec(valid, function(err, stdout, stderr) {
    // Hopefully bundleFairy doesnt return an error, 
    // since we are testing a valid fixture
    if (err) throw err;

    // Check to see that no errors were logged to stderr
    t.notOk(stderr, 'no errors logged');
    
    // Check to see that bundleFairy logged to stdout
    fs.exists(stdout.slice(0,-1), function(exists) {
      t.ok(exists, 'output exists');
      t.end();
    });
  });
});

test('executable script: invalid case', function(t) {
 
 // Setup invalid testcase

});
