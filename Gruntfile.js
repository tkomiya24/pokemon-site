/*global module,require */
module.exports = function(grunt) {
  'use strict';

  var watchFiles = ['public/**/*', 'server.js'];
  var ignoreFiles = ['bower_components', 'node_modules'];

  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080,
          base: '',
          open: {
            appName: 'Google Chrome',
            target: 'http://localhost:8080/public/pokeapp.html'
          }
        }
      }
    },
    nodemon: {
      default: {
        script: 'server.js',
        options: {
          nodeArgs: ['--debug'],
          watch: watchFiles,
          ignore: ignoreFiles
        }
      }
    }
  });
  grunt.registerTask('server', ['connect:server:keepalive']);
  grunt.registerTask('default', 'nodemon');
};
