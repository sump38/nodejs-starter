const fs = require('fs');

const carts = [];

class Cart {
    constructor(userID, products) {
        this.userID = userID;
        this.products = [];
        if (userID) {
            const cartIndex = carts.findIndex(cart => cart.userID === userID);
            if (cartIndex !== -1) {
                this.products = carts[cartIndex].products;
            }
        }
        if (products) {
            this.products = products;
        }
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(productIndex) {
        this.products.splice(productIndex, 1);
    }

    clear() {
        this.products = [];
        this.save();
    }

    updateProduct(product) {
        const productIndex = this.products.findIndex(p => p.name === product.name);
        if (productIndex === -1) {
            this.addProduct(product);
        } else {
            if (product.amount === 0) {
                this.removeProduct(productIndex);
            } else {
                this.products[productIndex] = product;
            }
        }
        this.save();
    }

    merge(cart) {
        cart.products.forEach(product => {
            this.updateProduct(product);
        });
    }


    save() {
        if (this.userID) {
            try {
                const cartsFile = fs.readFileSync('data/carts.json', 'utf8');
                const carts = JSON.parse(cartsFile);
                const cartIndex = carts.findIndex(cart => cart.userID === this.userID);
                if (cartIndex === -1) {
                    carts.push(this);
                } else {
                    carts[cartIndex] = this;
                }
                fs.writeFileSync('data/carts.json', JSON.stringify(carts));
            }
            catch (err) {
                console.log(err);
            }
            finally {
                console.log('carts saved');
            }
        }
    }
}

module.exports = Cart;