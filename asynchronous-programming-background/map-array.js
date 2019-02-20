/* eslint-disable no-console */
'use strict';

// map-array.js

/**
   * asynchrounos code with functional pattern mapping an array
   * non-destructive variant
   */
// when call this function we declare the visitor callback for calls it in mapCpsRec
exports.asyncCPSNonDestructive = (arr, visitor, done) => {
  // calls with index, outArr, inArr, visitor, done
  // here we just pass the visitor as is
  iterate(0, [], arr, visitor, done);
  
  function iterate(index, outArr, inArr, visitor, done) {
    if (index < inArr.length) {
      // here is the function, wich we declare when calls the mapCpsNonDestructive function.
      // Here we just call it with need arguments
      // elem, index, next
      visitor(inArr[index], index, result => {
        iterate(++index, outArr.concat(result), inArr, visitor, done);
      });
    } else {
      done(outArr);
    }
  }
};

/**
   * asynchronous code with functional pattern mapping an array
   * destructive variant
   */
exports.asyncCPSDestructive = (arrayLike, visitor, done) => {
  let index = 0;
  const results = [];

  iterate();

  function iterate() {
    if (index < arrayLike.length) {
      // calling visitor
      visitor(
        arrayLike[index], // passing elem
        index, // passing index
        result => { // passing callback
          results.push(result); // the result is elem.toUpperCase()
          index++;
          iterate();
        }
      );
    } else {
      done(results);
    }
  }
};

/**
  * parallel map
  */
exports.asyncCPSDestructiveParallel = (arrayLike, visitor, done) => {
  let resultCount = 0;
  const resultArray = new Array(arrayLike.length);
  
  for (let i = 0; i < arrayLike.length; i++) {
    visitor(
      arrayLike[i], // elem
      i, // index
      iterate.bind(null, i) // callback declaration
      /**
       * in this case we declared it bottom, and carring with first
       * parameter index with help Function.prototype.bind method.
       * Second parameter the result passing it in visitor's body,
       * when we calling the callback with elem.toUpperCase() as
       * parameter.
       * The best explanation given in MDN article
       * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind#Partially_applied_functions
       */
    );
  }
  // callback declaration for passing as visitor's last parameter
  function iterate(index, result) {
    resultArray[index] = result;
    resultCount++;
    if (resultCount === arrayLike.length) {
      done(resultArray);
    }
  }
};
