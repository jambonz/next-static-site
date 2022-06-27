// https://nextjs.org/docs/basic-features/eslint#lint-staged

const path = require('path');

const buildEslintCommand = (filenames) => {
  return `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;
};

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
};
