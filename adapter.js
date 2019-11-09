setHeading('Adapter Pattern');

/**
 * @typedef {{ name: string, quantity: number }} CartItem 
 */


/**
 * 
 * @param {object} params
 * @param {CartItem[]} params.items
 */
function ShoppingCart(params = {}) {
  /**
   * @type {CartItem[]}
   */
  this.items = [...(params.items || [])];
  /**
   * @param {CartItem} item
   */
  this.push = (item) => {
    const itemInCart = this.items.find(a => a.name === item.name);
    if (itemInCart) {
      itemInCart.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }
}


/**
 * 
 * @param {{ items: CartItem[] }} cart
 */
function findItemsInCart(cart = {}) {
  return cart.items.reduce((prev, currItem) => (currItem.quantity + prev), 0);
}

const myCart = new ShoppingCart();

myCart.push({ name: 'Milk 200g', quantity: 4 });
myCart.push({ name: 'Sugar 1kg', quantity: 3 });

console.table(myCart.items);

console.log(`myCart has ${findItemsInCart(myCart)} items`);



/**
 * @typedef {{ name: string, quantity: number, type?: string }} BetterCartItem 
 */

/**
 * 
 * @param {object} params
 * @param {BetterCartItem[]} params.items
 */
function BetterCart(params = {}) {
  /**
   * @param {BetterCartItem} item
   */
  this.push = (item) => {
    if (typeof item.type !== 'string') { item.type = 'other'; }
    if (!Array.isArray(this.items[item.type])) { this.items[item.type] = [] }
    
    const itemInCart = this.items[item.type].find(a => a.name === item.name);
    if (itemInCart) {
      itemInCart.quantity += item.quantity;
    } else {
      this.items[item.type].push(item);
    }
  }

  /**
   * @type {BetterCartItem[]}
   */
  this.items = {};
  (params.items || []).forEach(this.push)
}

const myCart2 = new BetterCart();

myCart2.push({ name: 'Milk 200g', quantity: 4, type: 'food' });
myCart2.push({ name: 'Sugar 1kg', quantity: 3, type: 'food' });
myCart2.push({ name: 'Water Bottle', quantity: 1, type: 'glassware' });
myCart2.push({ name: 'Shoe Polish', quantity: 1 });

console.log(myCart2.items);

// console.log(`myCart2 has ${findItemsInCart(myCart2)} items`);

function cartAdapter(newFormatCart) {
  return {
      items: Object.values(newFormatCart.items).reduce((outp, curr) => {
      outp.push(...curr);
      return outp;
    }, [])
  };
}

console.table(cartAdapter(myCart2).items);

console.log(`myCart2 has ${findItemsInCart(cartAdapter(myCart2))} items`);
