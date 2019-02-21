'use strict';
// cps-helpers

exports.forEachCps = (arr, visitor, done) => {
  forEachCpsRec(0, arr, visitor, done);
  
  function forEachCpsRec(index, arr, visitor, done) {
    if (index < arr.length) {
      visitor(
        arr[index], // elem
        index, // index
        () => forEachCpsRec(++index, arr, visitor, done) // next
      );
    } else {
      done();
    }
  }
};
