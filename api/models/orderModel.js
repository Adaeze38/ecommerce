const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
   product_id: {ref:'products', require:true,type:mongoose.Schema.Types.ObjectId},
   product_quantity:{type:Number,default:1 },

   
})


module.exports= mongoose.model('Orders',orderSchema)