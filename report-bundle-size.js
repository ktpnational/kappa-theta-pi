#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

// edited to work with the appdir by @raphaelbadia

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// @ts-check
import { gzipSize } from 'gzip-size';
import { mkdirp } from 'mkdirp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @typedef {{ raw: number, gzip: number }} ScriptSizes */
/** @typedef {Record<string, ScriptSizes>} PageSizes */
/** @typedef {Record<string, string[]>} BuildManifestPages */

/** @typedef {{
 *   pages: BuildManifestPages,
 *   rootMainFiles: string[]
 * }} BuildManifest */

/** @typedef {{
 *   pages: BuildManifestPages
 * }} AppDirManifest */

/** @typedef {{
 *   buildOutputDirectory?: string,
 *   name: string
 * }} Options */

// Pull options from `package.json`
/** @type {Options} */
const options = getOptions();
const BUILD_OUTPUT_DIRECTORY = getBuildOutputDirectory(options);

// first we check to make sure that the build output directory exists
const nextMetaRoot = path.join(process.cwd(), BUILD_OUTPUT_DIRECTORY);
try {
  fs.accessSync(nextMetaRoot, fs.constants.R_OK);
} catch (err) {
  console.error(
    `No build output found at "${nextMetaRoot}" - you may not have your working directory set correctly, or not have run "next build".`,
  );
  process.exit(1);
}

// if so, we can import the build manifest
/** @type {BuildManifest} */
// @ts-ignore
const buildMeta = JSON.parse(
  fs.readFileSync(path.join(nextMetaRoot, 'build-manifest.json'), 'utf8'),
);
/** @type {AppDirManifest} */
// @ts-ignore
const appDirMeta = JSON.parse(
  fs.readFileSync(path.join(nextMetaRoot, 'app-build-manifest.json'), 'utf8'),
);

/** @type {Record<string, [number, number]>} */
const memoryCache = {};

const globalBundle = buildMeta.pages['/_app'] || [];
const globalBundleSizes = await getScriptSizes(globalBundle);

/** @type {Promise<PageSizes>} */
const allPageSizes = Object.entries(buildMeta.pages).reduce(
  async (acc, [pagePath, scriptPaths]) => {
    const scriptSizes = await getScriptSizes(
      scriptPaths.filter((scriptPath) => !globalBundle.includes(scriptPath)),
    );
    (await acc)[pagePath] = scriptSizes;
    return acc;
  },
  /** @type {Promise<PageSizes>} */ (Promise.resolve({})),
);

const globalAppDirBundle = buildMeta.rootMainFiles || [];
const globalAppDirBundleSizes = await getScriptSizes(globalAppDirBundle);

/** @type {Promise<PageSizes>} */
const allAppDirSizes = Object.entries(appDirMeta.pages).reduce(
  async (acc, [pagePath, scriptPaths]) => {
    const scriptSizes = await getScriptSizes(
      scriptPaths.filter((scriptPath) => !globalAppDirBundle.includes(scriptPath)),
    );
    (await acc)[pagePath] = scriptSizes;
    return acc;
  },
  /** @type {Promise<PageSizes>} */ (Promise.resolve({})),
);

// format and write the output
const rawData = JSON.stringify({
  ...allAppDirSizes,
  __global: globalAppDirBundleSizes,
});

// log outputs to the gh actions panel
console.log(rawData);

// Changed this line to use mkdirp directly
await mkdirp(path.join(nextMetaRoot, 'analyze/'));
fs.writeFileSync(path.join(nextMetaRoot, 'analyze/__bundle_analysis.json'), rawData);

// --------------
// Util Functions
// --------------

/**
 * @param {string[]} scriptPaths
 * @returns {Promise<ScriptSizes>}
 */
async function getScriptSizes(scriptPaths) {
  const sizes = { raw: 0, gzip: 0 };
  for (const scriptPath of scriptPaths) {
    const [rawSize, gzSize] = await getScriptSize(scriptPath);
    sizes.raw += rawSize;
    sizes.gzip += gzSize;
  }
  return sizes;
}

/**
 * @param {string} scriptPath
 * @returns {Promise<[number, number]>}
 */
async function getScriptSize(scriptPath) {
  const encoding = 'utf8';
  const p = path.join(nextMetaRoot, scriptPath);

  if (p in memoryCache) {
    return memoryCache[p] || [0, 0];
  }

  try {
    const textContent = fs.readFileSync(p, encoding);
    const rawSize = Buffer.byteLength(textContent, encoding);
    const gzSize = await gzipSize(textContent);
    memoryCache[p] = [rawSize, gzSize];
    return [rawSize, gzSize];
  } catch (error) {
    console.error(`Error reading file: ${p}`, error);
    return [0, 0];
  }
}

/**
 * @param {string} [pathPrefix]
 * @returns {Options}
 */
function getOptions(pathPrefix = process.cwd()) {
  try {
    /** @type {{nextBundleAnalysis?: Partial<Options>, name: string}} */
    // @ts-ignore
    const pkg = JSON.parse(
      /** @type {string} */ (fs.readFileSync(path.join(pathPrefix, 'package.json'), 'utf8')),
    );
    if (typeof pkg !== 'object' || pkg === null) {
      throw new Error('Invalid package.json format');
    }
    return { ...pkg.nextBundleAnalysis, name: pkg.name };
  } catch (error) {
    console.error('Error reading package.json', error);
    return { name: 'unknown' };
  }
}

/**
 * @param {Options} options
 * @returns {string}
 */
function getBuildOutputDirectory(options) {
  return options.buildOutputDirectory || '.next';
}
