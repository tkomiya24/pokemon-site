/*global module,require */
module.exports = function(grunt) {
  'use strict';

  var watchFiles = ['public/**/*',];
  var publicJs = ['public/**/*.js'];
  var serverJs = ['app/**/*.js', 'config/*.js', 'server.js', 'db/*.js', 'Gruntfile.js'];
  var ignoreFiles = ['bower_components', 'node_modules'];
  var htmlFiles = ['public/**/*.html'];

  require('load-grunt-tasks')(grunt);
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serverJS: {
        files: serverJs,
        options: {
          livereload: true
        }
      },
      clientJS: {
        files: publicJs,
        options: {
          livereload: true
        }
      },
      html: {
        files: htmlFiles,
        options: {
          livereload: true
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true,
        limit: 10
      }
    },
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
          watch: watchFiles.concat(serverJs),
          ignore: ignoreFiles
        }
      }
    },
    jshint: {
      default: {
        src: publicJs.concat(serverJs)
      },
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      default: {
        src: publicJs.concat(serverJs)
      },
      options: {
        config: '.jscsrc',
        verbose: true
      }
    }
  });
  grunt.registerTask('server', ['connect:server:keepalive']);
  grunt.registerTask('default', 'concurrent:default');
  grunt.registerTask('precommit', ['jshint', 'jscs']);
};
