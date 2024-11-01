
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import terser from "@rollup/plugin-terser";
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default [
  {
    input: './src/ColorsPackage/index.js',
    output: [
      {
        file: 'ColorLib/index.js',
        format: 'cjs',
      },
      {
        file: 'ColorLib/index.es.js',
        format: 'es',
      }
    ],
    plugins: [
     
     babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react']
          }),
      external(),
      resolve(),
      commonjs(),
      postcss({
        plugins: [],
        minimize: true,
      }),
      terser(),
    ]
  }
];