setHeading('Singleton Pattern - Class Based');

class CustomNav {
  /**
   * @type {{
   *  push: Function,
   *  back: Function,
   *  forward: Function,
   *  forwardStack: string[],
   *  historyStack: string[],
   * }}
   */
  static instance = null;

  static getInstance = () => {
    if (!CustomNav.instance) {
      CustomNav.createInstance();
    }

    return CustomNav.instance;
  }
  
  static createInstance = () => {
    CustomNav.instance = {
      historyStack: [],
      forwardStack: [],

      push: (route) => {
        CustomNav.getInstance();
        CustomNav.instance.historyStack.push(route);
        CustomNav.instance.forwardStack = [];
        
        return CustomNav.getInstance();
      },

      back: () => {
        CustomNav.getInstance();
    
        if (CustomNav.instance.historyStack.length) {
          const poppedRoute = CustomNav.instance.historyStack.pop();
          CustomNav.instance.forwardStack.push(poppedRoute);
        }
    
        return CustomNav.getInstance();
      },

      forward: () => {
        CustomNav.getInstance();
    
        if (CustomNav.instance.forwardStack.length) {
          const poppedRoute = CustomNav.instance.forwardStack.pop();
          CustomNav.instance.historyStack.push(poppedRoute);
        }
    
        return CustomNav.getInstance();
      }
    }
  }

}

const nav = CustomNav.getInstance();

console.log(nav);

console.log((new CustomNav()).instance);

console.log(nav.push('/a'));
console.log(nav.push('/b'));

const nav2 = CustomNav.getInstance();
console.log(nav2);
console.log(nav2.back());
console.log(nav2.push('/c'));

console.log(`Same instance? ${nav === nav2}`);
console.log(nav2.historyStack);
