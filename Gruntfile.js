module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["build", 'client/*.min.*'],

    concat: {
      options: {
        separator: ';'
      },
      scripts: {
        src: ['client/app/**/*.js', 'client/app/services.js', 'client/app/app.js'],
        dest: 'build/scripts.js'
      },
      lib: {
        src: ['client/lib/*.js'],
        dest: 'build/lib.js'
      },
      css: {
        src: ['client/lib/normalize-css/normalize.css', 'client/styles/*.css'],
        dest: 'build/styles.css'
      },
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'client/scripts.min.js': ['<%= concat.scripts.dest %>'],
          'client/lib.min.js': ['<%= concat.lib.dest %>']
        }
      }
    },

    jshint: {
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
      },
      files: [
        'Gruntfile.js',
        'client/app/**/*.js',
      ],
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      dist: {
        files: {
          'client/styles.min.css': ['<%= concat.css.dest %>']
        }
      }
    },

    watch: {
      scripts: {
        files: ['client/app/**/*.js'],
        tasks: ['concat:scripts', 'uglify']
      },
      lib: {
        files: ['client/lib/**/*.js'],
        tasks: ['concat:lib', 'uglify']
      },
      css: {
        files: 'client/styles/*.css',
        tasks: ['concat:css', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('doit', ['test', 'clean', 'concat', 'uglify', 'cssmin']);

  grunt.registerTask('default', ['doit', 'watch']);
};
