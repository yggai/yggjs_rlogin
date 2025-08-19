import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  external: ['react', 'react-dom'],
  // copy CSS as asset without hashing so it becomes dist/styles.css
  loader: {
    '.css': 'copy',
  },
  esbuildOptions(options) {
    options.assetNames = '[name]'
  },
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.mjs' }
  },
})

