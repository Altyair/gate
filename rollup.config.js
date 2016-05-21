import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default{
  entry: 'js/demo/application.js',
  format: 'umd',
  dest: 'js/demo/bundle.js', // equivalent to --output

  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
  
    commonjs({
      // if true then uses of `global` won't be dealt with by this plugin
      ignoreGlobal: false,  // Default: false
  
      // if false then skip sourceMap generation for CommonJS modules
      sourceMap: false,  // Default: true
  
      // explicitly specify unresolvable named exports
      // (see below for more details)
      namedExports: { 'js/dist/gate.js': ['Gate' ] }  // Default: undefined 
    })
  ]
};