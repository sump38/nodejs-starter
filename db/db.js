const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const connectToDB = (connectionString, callback) => {
    try {
        MongoClient.connect(connectionString).then(client => {
            console.log('connected to database');
            _db = client.db('shop');
            callback({ client: client, err: null });
        });
    } catch (err) {
        console.log(err);
        callback({ client: null, err: err });
    };
};


/**
 * 
 * @returns {mongodb.Db}
 */
const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw 'No database found';
    }
};


module.exports.connectToDB = connectToDB;
module.exports.getDB = getDB;