'use strict';

var glob = require('glob');
var publicJs = glob.sync('./public/**/*.js');

function removePrefix(fileNames) {
  return fileNames.map(function(name) {
    return name.replace(/^\.\/public/, '');
  });
}

module.exports = {
  publicJs: publicJs,
  clientJs: removePrefix(publicJs)
};
