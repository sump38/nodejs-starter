const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;

const connectionString = 'mongodb+srv://dbuser:aDAghjDX0683lk9Q@shop.1apuisl.mongodb.net/';

let _db = null;

const initDb = callback => {
    mongoClient.connect(connectionString)
        .then(client => {
            _db = client.db('shop');
            console.log('Connected to MongoDB');
            callback(null, _db);
        })
        .catch(err => {
            callback(err);
        });
};
/**
 * 
 * @returns {mongodb.Db}
 */
const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    return _db;
}

module.exports = {initDb , getDb};
