const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Customer = new Schema({
account_number: {
    type: Number
},
balance: {
    type: Number
},
firstname: {
    type: String
},
lastname: {
    type: String
},
age: {
    type: Number
},
gender: {
    type: String
},
address: {
    type: String
},
employer: {
    type: String
},
email: {
    type: String
},
city: {
    type: String
},
state: {
    type: String
}
},
 {
collection: 'customers'
})
module.exports = mongoose.model('Customer', Customer)