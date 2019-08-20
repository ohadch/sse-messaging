const mongoose = require('mongoose');
const { HOST, PORT } = require("../config/mongo");

const server = `${HOST}:${PORT}`;

class Database {
    constructor(client) {
        this._connect(client)
    }

    _connect(client) {
        mongoose.connect(`mongodb://${server}/${client}`)
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = client => new Database(client);
