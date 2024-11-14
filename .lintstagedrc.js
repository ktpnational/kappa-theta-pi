module.exports = {
  '*.{md,mdx}': ['markdownlint'],
  '{LICENSE,README.md,TODO.md,.github/**/*.md,src/**/*.ts}': ['cspell --gitignore'],
  'package.json': ['npmPkgJsonLint'],
};
