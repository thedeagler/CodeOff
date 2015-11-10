module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ["build"],

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
        src: ['client/styles/*.css'],
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
      files: [
        'Gruntfile.js',
        'client/**/*.js',
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'client/lib/**/*.js',
          'build/**/*.js',
          'client/*.min.js'
        ]
      }
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
    },

    // shell: {
    //   prodServer: {

    //     command: 'git push azure master',
    //     options: {
    //       stdout: true,
    //       stderr: true,
    //       failOnError: true
    //     }
    //           }
    // },
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  // grunt.registerTask('server-dev', function (target) {
  //   var nodemon = grunt.util.spawn({
  //        cmd: 'grunt',
  //        grunt: true,
  //        args: 'nodemon'
  //   });
  //   nodemon.stdout.pipe(process.stdout);
  //   nodemon.stderr.pipe(process.stderr);

  //   grunt.task.run([ 'watch' ]);
  // });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('doit', ['test', 'clean', 'concat', 'uglify', 'cssmin']);

  // grunt.registerTask('upload', function(n) {
  //   if(grunt.option('prod')) {
  //     grunt.task.run([ 'shell:prodServer' ]);
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  grunt.registerTask('default', ['test', 'doit', 'watch']);
};