import path from 'path';

const fileTemplate = {
  absolutePath() {
    /**
     * TODO: Conflict with eslint-plugin-unicorn/prefer-module
     * import.meta.url is not supported in current module specified
     * + playwright works with commonjs
     */

    return path.resolve(__dirname, this.name);
  },
  toString() {
    return this.absolutePath();
  },
};

export const TestFiles = {
  csv: {
    ...fileTemplate,
    name: 'csv.csv',
  },
  dmg: {
    ...fileTemplate,
    name: 'dmg.dmg',
  },
  png: {
    ...fileTemplate,
    name: 'image.png',
  },
  pngSmall: {
    ...fileTemplate,
    name: 'imageSmall.png',
  },
  jpg: {
    ...fileTemplate,
    name: 'jpg.jpg',
  },
  pdf: {
    ...fileTemplate,
    name: 'pdf.pdf',
  },
  sh: {
    ...fileTemplate,
    name: 'sh.sh',
  },
  bat: {
    ...fileTemplate,
    name: 'test.bat',
  },
  txt: {
    ...fileTemplate,
    name: 'txt.txt',
  },
  xlsx: {
    ...fileTemplate,
    name: 'xlsx.xlsx',
  },
};
