var zipfile = require('zipfile');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports.isBundle = function(filepath, callback) {
  filepath = path.resolve(filepath);

  fs.exists(filepath, function(exists) {
    if (!exists) return callback(new Error('No such file: ' + filepath));

    var zf = new zipfile.ZipFile(filepath);
    var files = getBundleFiles(zf);
    
    // Official bundle "spec" documented here https://github.com/mapbox/bundle-fairy/tree/isbundle#bundle-fairy
    
    // A bundle is a zip that can only contain the following file types:
    // .geojson
    // .csv
    // .index (optional since each layer may not need an index (empty features or layer is not larger than 10MB))
    // .json (metadata file, only needed if there are multiple layers)
    // anything other file types means it is not a bundle

    // not a bundle if:
    // - contains both geojson AND csv files
    // - contains multiple csv files
    // - contains multiple layers but no metadata.json file 
    // (multiple layers means it was converted from a kml/gpx file, and metadata of the original kml/gpx must exist)
  

    // default to false, unless proven a bundle (in which case, return true)
    return callback(null, false);
  });
};

module.exports.extract = function(filepath, outdir, callback) {
  filepath = path.resolve(filepath);

  fs.exists(filepath, function(exists) {
    if (!exists) return callback(new Error('No such file: ' + filepath));

    // extract files to out directory

    return callback(null, final_uri);
  });
};

// Listing the files/file extensions within a zipfile can be handled a few different ways.
// Feel free to use this function if you would like. Or if you have another strategy,
// definitely feel free to not use this function
function getBundleFiles(zf) {
  // Must contain at least some files
  if (zf.names.length === 0) return false;
  var bundleFiles = zf.names;

  return bundleFiles;
}
