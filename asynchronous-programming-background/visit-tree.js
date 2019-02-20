/* eslint-disable no-console */
'use strict';

// map-array.js

const cpsHelpers = require('./cps-helpers');

/**
   * synchronous function wich iterate tree
   * @param {array} tree
   * @param {function} visitor 
   * The parameter name - visitor - can explain, than this callback function
   * do action like visitor, then visit the value of the tree
   */
exports.sync = (tree, visitor) => {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      this.sync(tree[i], visitor);
    }
  } else {
    visitor(tree);
  }
};

/**
   * Realization Visit Tree with Continuation-Passing Style pattern
   * @param {array} tree - arrayLike
   * @param {function} visitor - callback function
   * @param {function} done - callback function
   */
exports.asyncCPS = (tree, visitor, done) => {
  const iterate = (nodes, index, visitor, done) => {
    if (index < nodes.length) {
      this.asyncCPS(
        nodes[index], // tree
        visitor, // visitor
        () => iterate(nodes, ++index, visitor, done) // done
      );
    } else {
      done();
    }
  };
  
  if (Array.isArray(tree)) {
    iterate(tree, 0, visitor, done);
  } else {
    visitor(
      tree, // value parameter
      done // passing next parameter with function declaration
    );
  }

};

/**
   * visit tree with chs helper functions
   * @param {array} tree 
   * @param {function} visitor 
   * @param {function} done 
   */
exports.asyncCPSWithHelpers = (tree, visitor, done) => {
  if (Array.isArray(tree)) {
    cpsHelpers.forEachCps(
      tree,
      (subTree, index, next) => this.asyncCPSWithHelpers(subTree, visitor, next),
      done
    );
  } else {
    visitor(tree, done);
  }
};