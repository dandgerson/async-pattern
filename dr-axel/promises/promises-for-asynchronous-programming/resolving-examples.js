'use strict';

module.exports = () => {
  function asyncFunc() {
    return new Promise((resolve, reject) => {
      resolve();
    })
  }

  // console.log(asyncFunc() instanceof Promise);

  asyncFunc()
    .then(value1 => 123)
    .then(value2 => console.log('Simple resolving', value2));

  console.log('Synchronous', 1);

  asyncFunc()
    .then(value1 => ({ then(reaction) { reaction(123) } }))
    .then(value2 => console.log('Thenable resolving', value2));

  console.log('Synchronous', 2);
}