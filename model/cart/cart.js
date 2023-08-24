carts = [];

class Cart {
  constructor(userid, items) {
    if(!userid) {
      this.userid = null;
      this.items = items ?? [];
    } else {
      this.userid = userid;
      if(items) {
        this.items = items;
      }
      else {
        const cartData = carts.find(cart => cart.userid === userid);
        if(cartData) {
          this.items = cartData.items;
        } else {
          this.items = [];
        }
      }
    }
  }

  removeProduct(productIndex) {
    this.items.splice(productIndex, 1);
    this.save();
  }

  addProduct(product) {
    this.items.push(product);
    this.save();
  }

  updateCartItem(product) {
    const productIndex = this.items.findIndex(item => item.name === product.name);
    if(productIndex === -1 && product.amount > 0) {
      this.addProduct(product);
    } else {
      if(product.quantity === 0) {
        this.removeProduct(productIndex);
      } else {
        this.items[productIndex] = product;
        this.save();
      }
    }
  }

  clearCart() {
    this.items = [];
    this.save();
  }

  save() {
    if(this.userid === null) {
      return;
    }
    const cartIndex = carts.findIndex(cart => cart.userid === this.userid);
    if(cartIndex === -1) {
      carts.push(this);
    } else {
      carts[cartIndex] = this;
    }
  }
}

module.exports = Cart;