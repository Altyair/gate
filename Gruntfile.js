'use strict';
 
module.exports = function(grunt) {
   
   var globalConfig = {};
   
   var babel = require('rollup-plugin-babel');
   
   // 1. Всё конфигурирование тут
   grunt.initConfig({
      globalConfig : globalConfig,
      pkg : grunt.file.readJSON('package.json'),
      watch: {
        files: 'js/*',
        tasks: ['rollup']
      },
      rollup: {
         options: {
            format: 'umd',
            moduleName: 'MyBundle',
            plugins: [
               babel({
                 exclude: './node_modules/**'
               })
            ]
         },
         files: {
            'dest':'js/dist/gate.js',
            'src' : 'js/Gate.js', 
         }
      },
   });

   // 3. Здесь мы сообщаем Grunt, что мы планируем использовать этот плагин:
   //grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-watch');
   //grunt.loadNpmTasks('grunt-browserify');
   grunt.loadNpmTasks('grunt-rollup');

   // 4. Мы сообщаем Grunt, что нужно делать, когда мы введём "grunt" в терминале.
   grunt.registerTask('default', ['rollup']);
};