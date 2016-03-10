var zipfile = require('zipfile');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = function(filepath, extract, callback) {
  filepath = path.resolve(filepath);

  fs.exists(filepath, function(exists) {
    if (!exists) return callback(new Error('No such file: ' + filepath));

    var zf = new zipfile.ZipFile(filepath);
    var files = getBundleFiles(zf);
    
    // Return false if all the required bundle files are not there
    if (!files) return callback(null, false);

    // If second argument exists, extractFiles
    // extractFiles(zf, files, callback);
  });
};

function invalid(msg) {
  var err = new Error(msg);
  err.code = 'EINVALID';
  return err;
}

function getBundleFiles(zf) {
  // Required file exts to look for
  var exts = [
    '.json',
    '.geojson',
    '.index'
  ];

  // Must contain at least some files
  if (zf.names.length === 0) return false;
  var filenames = zf.names;

  // Find required files
  // Must contain at least:
  // 1 metadata.json file
  // 1 geojson file/layer
  // 1 index file for each layer
  // if not, return false


  // Passed!
  return bundleFiles;
}