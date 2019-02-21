/* eslint-disable no-console */
'use strict';

// log-array.js

const cpsHelpers = require('./cps-helpers');
/**
   * synchronous code with simple for loop
   * @param {array} arr
   */
exports.syncLoop = arr => {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  console.log('### Done');
};

/**
   * synchronous code with functional pattern recursion
   * @param {array} arr
   */
exports.syncLoopRecursion = arr => {
  iterate(0, arr);
  console.log('### Done');

  function iterate(index, arr) {
    if (index < arr.length) {
      console.log(arr[index]);
      iterate(++index, arr);
    }
  }
};

/**
   * asynchronous code with functional pattern continuation-passing style
   * @param {array} arr
   */
exports.asyncCPSLoop = arr => {
  cpsHelpers.forEachCps(
    arr, // arr
    (elem, index, next) => { // visitor callback declaration
      console.log(elem);
      next();
    },
    () => console.log('### Done')); // done callback declaration
}

