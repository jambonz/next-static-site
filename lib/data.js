const fs = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const dataDir = path.join(process.cwd(), 'data');

function _getData(key) {
  const fullPath = path.join(dataDir, `${key}.yml`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return yamljs.parse(fileContents);
}

export function getData(key) {
  return {
    [key]: _getData(key),
    site: _getData('site'),
  };
}