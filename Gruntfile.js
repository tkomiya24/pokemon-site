/*global module,require */
module.exports = function(grunt) {
  'use strict';

  var watchFiles = ['public/**/*', 'server.js', 'Gruntfile.js'];
  var watchFilesJs = ['public/**/*.js', 'server.js', 'db/*.js'];
  var serverFilesJs = ['app/**/*.js', 'config/*.js'];
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
          watch: watchFiles.concat(serverFilesJs),
          ignore: ignoreFiles
        }
      }
    },
    jshint: {
      default: {
        src: watchFilesJs.concat(serverFilesJs)
      },
      options: {
        jshintrc: '.jshintrc',
        force: true
      }
    },
    jscs: {
      default: {
        src: watchFilesJs.concat(serverFilesJs)
      },
      options: {
        config: '.jscsrc',
        verbose: true
      }
    }
  });
  grunt.registerTask('server', ['connect:server:keepalive']);
  grunt.registerTask('default', 'nodemon');
  grunt.registerTask('precommit', ['jshint', 'jscs']);
};
