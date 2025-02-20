//import { build } from 'esbuild';
//import { readFileSync } from 'fs';
const { build } = require('esbuild');
// const { dependencies } = require('./package.json');

const fs = require('fs');

// Leer el archivo package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Obtener todas las dependencias y devDependencies
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});

// Combinar todas las dependencias en un solo array
const allDependencies = [...dependencies, ...devDependencies];
const entryFile = 'src/app.ts'; // Ruta a tu archivo principal


const buildOptions = [
  {
    entryPoints: [entryFile],
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: 'node',
    outfile: 'dist/bundle.js',
    external: allDependencies,
    target: 'node14',
  },

];

buildOptions.forEach((options) => {
  build(options).catch((err) => {
    console.error(err);
    process.exit(1);
  });
});
