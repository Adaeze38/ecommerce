const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name:String,
    _id:mongoose.Schema.Types.ObjectId,
    price: Number,
    productImage:{type:String}
    

})



module.exports= mongoose.model('Product',productSchema)