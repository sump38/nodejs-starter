const Cart = require('../../model/cart/cart.model');


module.exports.getCartData = (req, res) => {
    res.json(req.session.cart.products);
};

module.exports.updateCart = (req, res) => {
    const product = req.body;
    const cart = req.session.cart;
    cart.updateProduct(product);
    res.json(cart.products);
};

module.exports.clearCart = (req, res) => {
    req.session.cart.clear();
    res.json(req.session.cart.products);
};

module.exports.initCart = async (req, res, next) => {
    if (req.session.user) {
        const newCart = await Cart.getOrCreateCart(req.session.user.name);
        if (req.session.cart && req.session.cart.userID) {
            newCart.merge(req.session.cart);
        }
        req.session.cart = newCart;
    } else {
        if (!req.session.cart) {
            req.session.cart = await Cart.getOrCreateCart(null);
        } else {
            req.session.cart = await Cart.getOrCreateCart(null, req.session.cart.products);
        }
    }
    next();
};
