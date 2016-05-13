var glob = require('glob');

module.exports = {
  publicJs: glob.sync('./public/**/*.js')
};
