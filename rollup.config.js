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
      ignoreGlobal: false,  // Default: false
  
      sourceMap: false,  // Default: true
  
      namedExports: { 'js/dist/gate.js': ['Gate' ] }  // Default: undefined 
    })
  ]
};