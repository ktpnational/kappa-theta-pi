import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import type { PackageJson } from 'type-fest';

const packageJsonPath = path.join(process.cwd(), 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson;
const dependencies = Object.keys(packageJson.dependencies || {});
const devDependencies = Object.keys(packageJson.devDependencies || {});
const allDependencies = [...dependencies, ...devDependencies];
const OUTPUT_DIR = './scripts/out';

const getPackageSize = (packageName: string): { name: string; size: number } | null => {
  try {
    const result = execSync(`npm view ${packageName} dist.unpackedSize --json`, {
      encoding: 'utf-8',
    });
    const size = JSON.parse(result) as number;
    return {
      name: packageName,
      size: size,
    };
  } catch (error) {
    console.error(
      `Failed to get size for ${packageName}:`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
};

const packageSizes = allDependencies
  .map((packageName) => getPackageSize(packageName))
  .filter(Boolean);

const sortedPackageSizes = packageSizes.sort((a, b) => b.size - a.size);

fs.writeFileSync(`${OUTPUT_DIR}/package-sizes.json`, JSON.stringify(sortedPackageSizes, null, 2));
