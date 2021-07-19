// Generates fixtures JSON files from jambonz YAML data for Cypress
// Uses `yarn pretest` to run this script
// Uses `yarn posttest` to run fixtures cleanup (rm -rf)

const fs = require('fs');
const path = require('path');
const yamljs = require('yamljs');
const dataDir = path.join(process.cwd(), 'data');
const fixDir = path.join(process.cwd(), 'cypress/fixtures');

if (!fs.existsSync(fixDir)) {
  fs.mkdirSync(fixDir);
}

fs.readdirSync(dataDir).forEach((file) => {
  const filePath = `${dataDir}/${file}`;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const fileJSON = yamljs.parse(fileContents);
  const fileOut = path.join(fixDir, file.replace('.yml', '.json'));

  fs.writeFileSync(fileOut, JSON.stringify(fileJSON, null, 2));
});