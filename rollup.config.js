import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default{
  entry: 'demo/main.js',
  format: 'umd',
  dest: 'demo/bundle.js', // equivalent to --output

  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),
  
    commonjs({
      ignoreGlobal: false,  // Default: false
  
      sourceMap: false,  // Default: true
  
      namedExports: { 'dist/gate.js': ['Gate' ] }  // Default: undefined 
    })
  ]
};