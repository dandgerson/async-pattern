'use strict';

const arr = [1, 2, 3, 4, 5, 6];
  logArray(arr);

/**
 * synchronous code with simple for loop
 * @param {array} arr 
 */
function logArrayLoop(arr) {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
  console.log("### Done");
}

/**
 * synchronous code with functional pattern recursion
 * @param {array} arr 
 */
function logArrayRecursion(arr) {
  logArrayRec(0, arr);
  console.log("### Done");
  
  function logArrayRec(index, arr) {
    if (index < arr.length) {
      console.log(arr[index]);
      logArrayRec(++index, arr);
    }
  }
}


function logArray(arr) {
  forEachCps(arr, (elem, index, next) => {
    console.log(elem);
    next();
  }, () => console.log('### Done'));
}

function forEachCps(arr, visitor, done) {
  forEachCpsRec(0, arr, visitor, done);
}

function forEachCpsRec(index, arr, visitor, done) {
  if (index < arr.length) {
    visitor(arr[index], index, () => {
      forEachCpsRec(++index, arr, visitor, done);
    })
  } else {
    done();
  }
}