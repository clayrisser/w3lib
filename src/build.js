import _ from 'lodash';
import easycp from 'easycp';
import fs from 'fs';
import path from 'path';
import Promise from 'bluebird';

const config = {
  rootDir: 'src'
};

async function build() {
  const files = await new Promise((resolve, reject) => {
    fs.readdir(path.resolve(config.rootDir), (err, files) => {
      if (err) return reject(err);
      return resolve(files);
    });
  });
  await Promise.mapSeries(files, async fileName => {
    if (isDir(fileName)) {
      console.log(fileName);
      if (exists(fileName, 'index.scss')) {
        await easycp('parcel', [
          'build',
          `src/${fileName}/index.scss`,
          '-d',
          'lib',
          '-o',
          `${fileName}.css`
        ]);
      }
      if (exists(fileName, 'index.js')) {
        await easycp('parcel', [
          'build',
          `src/${fileName}/index.js`,
          '-d',
          'lib',
          '-o',
          `${fileName}.js`
        ]);
      }
    }
  });
  await easycp('parcel', [
    'build',
    'src/index.js',
    '-d',
    'lib',
    '-o',
    'index.js'
  ]);
}

function exists(folderName, fileName) {
  return fs.existsSync(path.resolve(config.rootDir, folderName, fileName));
}

function isDir(fileName) {
  const filePath = path.resolve(config.rootDir, fileName);
  return fs.lstatSync(filePath).isDirectory();
}

build();
