const path = require('path');
const DB_NAME = 'my-project';
const TEST_DB_NAME = 'my-project-test';
const DIST_DIR = path.join(__dirname, '../dist');
const ENTRY_FILE = path.join(__dirname, '../client/index.js');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const DIST_DIR_INDEX_FILE = path.join(DIST_DIR, 'index.html');

// templates
const TEMPLATE_FILE = path.join(TEMPLATES_DIR, 'template.html');

// database
const DB_TEST = `mongodb://localhost/${TEST_DB_NAME}`;
const DB = `mongodb://localhost/${DB_NAME}`;

// prod
const VENDOR_LIBS = [
  'babel-polyfill',
  'react',
  'react-dom',
];

// express
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

module.exports = {
  ENTRY_FILE,
  VENDOR_LIBS,
  // templates
  TEMPLATE_FILE,
  // dist
  DIST_DIR,
  DIST_DIR_INDEX_FILE,
  // express
  PORT,
  HOST,
  DB,
  DB_TEST,
};
