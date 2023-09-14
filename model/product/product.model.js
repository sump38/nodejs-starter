const { getDB } = require('../../db/db');

class Product {
    constructor({
        name,
        description,
        image,
        price,
        amount
    }) {
        this.name = name;
        this.description = description;
        this.amount = amount;
        this.image = image;
        this.price = price;
    }

    save() {
        //save to DB
    }

    static async getProducts(page = 1, limit = 20) {
        const db = getDB();
        const productsCollection = db.collection('products');
        const products = productsCollection.find().limit(limit).skip(limit * (page - 1)).toArray();
        return products;
    }
}


module.exports = Product;