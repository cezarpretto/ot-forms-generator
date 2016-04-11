module.exports = function (grunt)
{
  grunt.initConfig ({

    'angular-builder': {
      options: {
        mainModule: 'ot-forms-generator'
      },
      app: {
        src:  'src/**/*.js',
        dest: 'build/ot-files-directive-release.js'
      }
    },
    'nginlinetemplates': {
      app: {
        src: 'src/*.html',
        dest: 'build/ot-files-directive-release.js'
      }
    },
    'clean': {
      build: ['build/ot-files-directive-release.js']
    }
  });

  grunt.loadNpmTasks ('grunt-angular-builder');
  grunt.loadNpmTasks('grunt-angular-inline-templates');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask ('release', ['clean', 'angular-builder', 'nginlinetemplates']);
  grunt.registerTask ('debug', ['angular-builder::debug']);

};
