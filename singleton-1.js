setHeading('Singleton Pattern - IIFE and closure based');


// IIFE and closure used for protecting internal implementations
const SDK = (function () {
  let instance;

  async function initSDK() {
    // can add additional blueprint properties here
    const object = {};
    // maybe some API calls here
    return object;
  }

  return {
      getInstance: async function () {
          if (!instance) {
              instance = await initSDK();
          }
          // can add more accessor info here
          return instance;
      }
  };
})();

async function run() {

  const instance1 = await SDK.getInstance();
  const instance2 = await SDK.getInstance();

  console.log("Same instance? " + (instance1 === instance2));

  console.log(new SDK());
}

run();
