'use strict';

module.exports = () => {

  
  const arr = [1, 2, 3, 4, 5, 6];
  
  logArrayLoop(arr);
  
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

  logArrayRecursion(arr);

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

  logArrayCps(arr);

  /**
   * asynchronous code with functional pattern continuation-passing style
   * @param {array} arr 
   */
  function logArrayCps(arr) {
    forEachCps(
      arr, // arr
      (elem, index, next) => { // visitor callback declaration
        console.log(elem);
        next();
      },
      () => console.log('### Done')); // done callback declaration
  }

  function forEachCps(arr, visitor, done) {
    forEachCpsRec(0, arr, visitor, done);
  }
  function forEachCpsRec(index, arr, visitor, done) {
    if (index < arr.length) {
      visitor(
        arr[index], // elem
        index, // index
        () => forEachCpsRec(++index, arr, visitor, done) // next
      )
    } else {
      done();
    }
  }

  // Mapping an array

  mapCpsNonDestructive(
    ['one', 'two', 'three'], // arrayLike
    // declare visitor with calling callback
    (elem, index, callback) => callback(elem.toUpperCase()), // visitor
    // declare done
    result => console.log(`RESULT: ${result}`) // done
  );

  /**
   * asynchrounos code with functional pattern mapping an array
   * non-destructive variant
   */
  // when call this function we declare the visitor callback for calls it in mapCpsRec
  function mapCpsNonDestructive(arr, visitor, done) {
    // calls with index, outArr, inArr, visitor, done
    // here we just pass the visitor as is
    mapCpsRec(0, [], arr, visitor, done);
  }
  function mapCpsRec(index, outArr, inArr, visitor, done) {
    if (index < inArr.length) {
      // func we declare when calls the mapCps function. Here we just call it with need arguments
      // elem, index, next
      visitor(inArr[index], index, result => {
        mapCpsRec(++index, outArr.concat(result), inArr, visitor, done);
      });
    } else {
      done(outArr);
    }
  }


  mapCpsDestructive(
    ['one', 'two', 'three'], // arrayLike
    // declare visitor with calling callback
    (elem, index, callback) => callback(elem.toUpperCase()), // visitor
    // declare done
    result => console.log(`RESULT: ${result}`) // done
  );

  /**
   * asynchronous code with functional pattern mapping an array
   * destructive variant
   */
  function mapCpsDestructive(arrayLike, visitor, done) {
    let index = 0;
    const results = [];
    
    mapOne();
    
    function mapOne() {
      if (index < arrayLike.length) {
        // calling visitor
        visitor(
          arrayLike[index], // passing elem
          index, // passing index
          result => { // passing callback
            results.push(result); // the result is elem.toUpperCase()
            index++;
            mapOne();
          }
        );
      } else {
        done(results);
      }
    }
  }

  // Variation: parallel map

  parallelMapCps(
    ['one', 'two', 'three'], // arrayLike
    // declare visitor with calling callback
    (elem, index, callback) => callback(elem.toUpperCase()), // visitor
    // declare done
    result => console.log(`RESULT: ${result}`) // done
  );
  
  /**
   * parallel map
   */
  function parallelMapCps(arrayLike, visitor, done) {
    let resultCount = 0;
    const resultArray = new Array(arrayLike.length);
    for (let i = 0; i < arrayLike.length; i++) {
      visitor(
        arrayLike[i], // elem
        i, // index
        maybeDone.bind(null, i) // callback declaration
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
    function maybeDone(index, result) {
      resultArray[index] = result;
      resultCount++;
      if (resultCount === arrayLike.length) {
        done(resultArray);
      }
    }
  }

  // Iterating over a tree

  const nestedArray = [[1, 2], 3, [ 4, 5], 6];

  visitTree(nestedArray, value => console.log(value))

  /**
   * synchronous function wich iterate tree
   * @param {array} tree
   * @param {callback function} visitor 
   * The parameter name - visitor - can explain, than this callback function
   * do action like visitor, then visit the value of the tree
   */
  function visitTree(tree, visitor) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        visitTree(tree[i], visitor);
      }
    } else {
      visitor(tree);
    }
  }

// Visit Tree with Continuation-Passing Style

  visitTreeCps(
    nestedArray, // tree
    (value, next) => { // visitor declaration
      console.log(value);
      next();
    },
    () => console.log('### Done') // done
  );
  console.log('start exec visitTreeCps');

  function visitTreeCps(tree, visitor, done) {
    if (Array.isArray(tree)) {
      visitNodes(tree, 0, visitor, done);
    } else {
      visitor(
        tree, // value parameter
        done // passing next parameter with function declaration
      );
    }
  }
  function visitNodes(nodes, index, visitor, done) {
    if (index < nodes.length) {
      visitTreeCps(
        nodes[index], // tree
        visitor, // visitor
        () => visitNodes(nodes, ++index, visitor, done) // done
      )
    } else {
      done();
    }
  }

};