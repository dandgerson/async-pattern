/* eslint-disable no-console */
'use strict';

const asyncBackground = require('./dr-axel/cps/asynchronous-programming-background');

const arr = [1, 2, 3, 4, 5, 6];
const tree = [[1, 2], 3, [4, 5], 6];

asyncBackground.logArray.syncLoop(arr);
asyncBackground.logArray.syncLoopRecursion(arr);
asyncBackground.logArray.asyncCPSLoop(arr);

// Mapping an array

asyncBackground.mapArray.asyncCPSNonDestructive(
  ['one', 'two', 'three'], // arrayLike
  // declare visitor with calling callback
  (elem, index, callback) => callback(elem.toUpperCase()), // visitor
  // declare done
  result => console.log(`RESULT: ${result}`) // done
);
asyncBackground.mapArray.asyncCPSDestructive(
  ['one', 'two', 'three'], // arrayLike
  // declare visitor with calling callback
  (elem, index, callback) => callback(elem.toUpperCase()), // visitor
  // declare done
  result => console.log(`RESULT: ${result}`) // done
);
asyncBackground.mapArray.asyncCPSDestructiveParallel(
  ['one', 'two', 'three'], // arrayLike
  // declare visitor with calling callback
  (elem, index, callback) => callback(elem.toUpperCase()), // visitor
  // declare done
  result => console.log(`RESULT: ${result}`) // done
);

// Iterating over a tree

asyncBackground.visitTree.sync(tree, value => console.log(value));

asyncBackground.visitTree.asyncCPS(
  tree, // tree
  // visitor declaration
  (value, next) => { // next is a callback wich calls to init next iteration
    console.log(value);
    next();
  },
  () => console.log('### Done') // done declaration
);

asyncBackground.visitTree.asyncCPSWithHelpers(
  tree, // tree
  // visitor declaration
  (value, next) => { // next is a callback wich calls to init next iteration
    console.log(value);
    next();
  },
  () => console.log('### Done') // done declaration
);