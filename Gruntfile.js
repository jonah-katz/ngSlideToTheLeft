module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // installs bower dependencies
    auto_install: {
      local: {}
    },

    // Serve
    connect: {
      server: {
        options: {
          port: 8100,
          base: '.'
        }
      }
    },

    // concat lib js into dist js
    concat: {
      dist: {
        src: [ 'lib/**/*.js'],
        dest: 'dist/ng-slide-to-the-left.js'
      }
    },

    // compile lib sass and move to dist sass
    sass: {
      dist: {
        files: {
          'dist/ng-slide-to-the-left.css':'lib/scss/ng-slide-to-the-left.scss'
        }
      }
    },

    // concat bower css and lin css into dist
    concat_css: {
      options: {},
      all: {
        src: ["dist/ng-slide-to-the-left.css", "bower_components/_bower.css"],
        dest: "dist/ng-slide-to-the-left.min.css"
      }
    },

    // ugligy
    uglify: {
      my_target: {
        files: {
          'dist/ng-slide-to-the-left.min.js': ['dist/ng-slide-to-the-left.js']
        }
      }
    },

    // minify css
    cssmin: {
      target: {
        files: [{
          'dist/ng-slide-to-the-left.min.css': ['dist/ng-slide-to-the-left.css']
        }]
      }
    },

    // watch lib and auto build
    watch: {
      scripts: {
        files: [
          'lib/**/*.js',
          'lib/**/*.html',
          'lib/**/*.scss'
        ],
        tasks: [ 'compile' ]
      },
    }
  });

  // start server and build files
  grunt.registerTask('develop', [
    'connect',
    'watch'
  ]);

  grunt.registerTask('bower', [
    'bower_concat'
  ]);

  // compile scripts
  grunt.registerTask('compile', [
    'concat',
    'sass',
    'concat_css',
    'uglify',
    'cssmin'
  ]);

  // install bower and compile scripts
  grunt.registerTask('default', [
    'auto_install',
    'compile'
  ]);
};
