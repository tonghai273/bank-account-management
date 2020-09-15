var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Define collection and schema
var User = new Schema({
    email: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number
    }
},
 {
collection: 'users'
});
module.exports = mongoose.model('User', User)