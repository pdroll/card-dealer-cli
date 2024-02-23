import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const plugins = [
  commonjs(),
  nodeResolve({ exportConditions: ['node'] }),
  typescript(),
  terser({ keep_classnames: true }),
]

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/cli.js',
        format: 'cjs',
      },
    ],
    plugins,
  },
  {
    input: 'src/lib/index.ts',
    output: [
      {
        file: 'build/lib.module.js',
        format: 'es',
      },
    ],
    plugins,
  },
]
