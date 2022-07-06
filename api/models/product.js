const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id: {type: String},
    name: {type: String, required: true},
    price: {type: String, required: true},
    picture: {type: String, required: false} 
})

module.exports = mongoose.model('Product', productSchema)