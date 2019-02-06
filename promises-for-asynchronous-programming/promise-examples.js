'use strict';

console.log('demonstrate-async-patterns.js');

const fs = require('fs');

const { promisify } = require('util');

const readFilePromisified = promisify(fs.readFile);
const writeFilePromisified = promisify(fs.writeFile);

module.exports = () => {
  /**
   * callback pattern
   */
  fs.readFile('data.md', (err, data) => {
    if (err) {
      console.error('Error while reading test file')
    } else {
      fs.writeFile('./raw/callback-pattern.md', data, err => {
        if (err) console.error(err);
        console.log('The file has been saved by CALLBACK pattern!');
      });
    }
  });
  
  /**
   * promise flatten pattern
   */
  readFilePromisified('data.md')
    .then(data => {
      return writeFilePromisified('./raw/promisified-flatten-pattern.md', data)
    })
    .then(() => console.log('The file has been saved by PROMISE FLATTEN pattern!'))
    .catch(err => console.log(err));
  
  /**
   * promise nested (anti)pattern. MISTAKE
   */
  readFilePromisified('data.md')
    .then(data => {
      writeFilePromisified('./raw/promisified-nested-pattern.md', data)
        .then(() => console.log('The file has been saved by PROMISE NESTED (anti)pattern!'))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  
  /**
   * async / await pattern
   */
  async function asyncCopyFile(filename, newFilename) {
    const fileContent = await readFilePromisified(filename);
    return writeFilePromisified(newFilename, fileContent);
  }
  
  asyncCopyFile('./data.md', './raw/async-await-pattern.md')
    .then(() => console.log('The file has been saved by ASYNC/AWAIT pattern!'))
    .catch(error => console.error(error));
}