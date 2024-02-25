import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import executable from 'rollup-plugin-executable'

const plugins = [
  commonjs(),
  nodeResolve({ exportConditions: ['node'] }),
  typescript({ tsconfig: './tsconfig.json' }),
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
        format: 'es',
      },
    ],
    plugins,
  },
]
