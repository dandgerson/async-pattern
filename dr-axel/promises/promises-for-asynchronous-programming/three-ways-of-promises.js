'use strict';

module.exports = () => {

  function asyncFunc() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('DONE'), 100);
    });
  }
  asyncFunc()
    .then(x => console.log('Result: ' + x));
      
  /**
   * Conceptually: calling a Promise-based function is blocking
   */
      
  async function main() {
    const x = await asyncFunc();
    console.log('Result2: ' + x);
  }
  main();
        
  /**
   * A Promise is a container for an asynchronously delivered value
   */
        
  function asyncFunc2() {
    const blank = [];
    setTimeout(() => blank.push('DONE'), 100);
    return blank;
  }
          
  const blank = asyncFunc2();
          
  setTimeout(() => {
    const x = blank[0];
    console.log('Result3: ' + x);
  }, 200);
            
  /**
   * A Promise is an event emitter
   */
            
  function asyncFunc3() {
    const eventEmitter = { success: [] };
    setTimeout(() => {
      for (const handler of eventEmitter.success) {
        handler('DONE');
      }
    }, 100)
    return eventEmitter;
  }
  asyncFunc3().success.push(x => console.log('Result4: ' + x));
};