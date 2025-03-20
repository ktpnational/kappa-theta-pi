const { execSync } = require('child_process');

const packages = process.argv.slice(2);

if (packages.length === 0) {
  console.error('Please provide at least one package name to uninstall.');
  process.exit(1);
}

const packageList = packages.join(' ');

execSync(`bun remove --ignore-scripts ${packageList}`, { stdio: 'inherit' });

console.log(`Successfully uninstalled: ${packageList}`);
