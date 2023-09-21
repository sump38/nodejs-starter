const { ObjectId } = require("mongodb");
const { getDB } = require("../../db/db");

class Product {
    constructor({ _id, name, description, image, price, amount }) {
        this._id = _id;
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
        const productsCollection = db.collection("products");
        const products = productsCollection
            .find()
            .limit(limit)
            .skip(limit * (page - 1))
            .toArray();
        return products;
    }

    static async getProductById(id) {
        const productsCollection = getDB().collection("products");
        const product = await productsCollection.findOne({
            _id: new ObjectId(id),
        });
        return new Product(product);
    }
}

module.exports = Product;
