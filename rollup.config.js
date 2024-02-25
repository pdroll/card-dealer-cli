import commonjs from '@rollup/plugin-commonjs'
import executable from 'rollup-plugin-executable'
import nodeResolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'

const plugins = [
  commonjs(),
  nodeResolve({ exportConditions: ['node'] }),
  typescript({ tsconfig: './tsconfig.json', outputToFilesystem: true }),
  terser({ keep_classnames: true }),
]

export default [
  {
    input: 'src/cli.ts',
    output: [
      {
        file: 'build/cli.js',
        format: 'cjs',
      },
    ],
    plugins: [...plugins, executable()],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'build/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'build/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins,
  },
]
