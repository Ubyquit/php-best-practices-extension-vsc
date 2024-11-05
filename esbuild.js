const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const production = process.argv.includes('--production');
const watch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/extension.ts'],
  bundle: true,
  format: 'cjs',
  minify: production,
  sourcemap: !production,
  sourcesContent: false,
  platform: 'node',
  outfile: 'dist/extension.js',
  external: ['vscode'],
  logLevel: 'info',
};

async function build() {
  if (watch) {
    console.log('[watch] build started');

    const ctx = await esbuild.build({
      ...buildOptions,
      watch: {
        onRebuild(error, result) {
          console.log('[watch] build started');
          if (error) {
            error.errors.forEach((err) => {
              const { file, line, column } = err.location;
              console.error(`> ${file}:${line}:${column}: error: ${err.text}`);
            });
          } else {
            copyAssets();
            console.log('[watch] build finished');
          }
        },
      },
    });

    copyAssets();
    console.log('[watch] build finished');
  } else {
    try {
      await esbuild.build(buildOptions);
      copyAssets();
      console.log('build finished');
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

function copyAssets() {
  // Copiar es.json de src/ a dist/
  const srcPath = path.join(__dirname, 'src', 'es.json');
  const destPath = path.join(__dirname, 'dist', 'es.json');

  fs.copyFileSync(srcPath, destPath);
}

build();