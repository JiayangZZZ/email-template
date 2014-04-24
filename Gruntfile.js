module.exports = function(grunt) {

  grunt.initConfig({
    compass : { // Target options
      dev : {
        options: {
          sassDir : 'app/public/styles',
          cssDir : 'app/public/styles/build',
          noLineComments : true,
          debugInfo : true
        }
      }
    },

    watch : {
      styles : { // Target options
        files : [
          '**/*.scss' //glob file pattern
        ],

        tasks : ['compass']
      },

      templates : {
        files : [
          '**/*.dot'
        ],

        tasks : ['dot']
      }
    },

    dot : {
      dist: {
        options: {
          variable : 'tmpl',
          root : __dirname + '/app',
          requirejs : true,
          node : true
        },
        src : [
          '**/*.dot'
        ],
        dest : 'template/tmpl.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-dot-compiler');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
};
