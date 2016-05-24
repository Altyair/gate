'use strict';
 
module.exports = function(grunt) {
   
   var globalConfig = {};
   
   var babel = require('rollup-plugin-babel');
   
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

   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-rollup');

   grunt.registerTask('default', ['rollup']);
   
   console.log(55777);
};