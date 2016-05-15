'use strict';
 
module.exports = function(grunt) {
   
   var globalConfig = {};
   
   // 1. Всё конфигурирование тут
   grunt.initConfig({
      globalConfig : globalConfig,
      pkg : grunt.file.readJSON('package.json'),
      browserify: {
         main: {
            src: [
               'bower_components/**/*.js', // 
               'js/Gate.js'  // 
            ],
            dest: 'js/dist/gate.js',
         }
      },
      watch: {
        files: 'js/*',
        tasks: ['default']
      }

   });

   // 3. Здесь мы сообщаем Grunt, что мы планируем использовать этот плагин:
   //grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-browserify');

   // 4. Мы сообщаем Grunt, что нужно делать, когда мы введём "grunt" в терминале.
   grunt.registerTask('default', ['browserify', 'watch']);

};