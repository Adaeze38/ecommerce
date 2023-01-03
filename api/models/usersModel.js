const mongoose = require('mongoose');
const usersSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    dateOfBirth:Date,
    password:{type:String,required:true,},
    emailAddress:{type:String, required:true, unique:true,
     match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
},
    phoneNumber:{type:Number,required:true,unique:true,
        // match: /^((^+)(234){1}[0–9]{10})|((^234)[0–9]{10})|((^0)(7|8|9){1}(0|1){1}[0–9]{8})/
},
    gender:String,
    address:String,

    _id:mongoose.Schema.Types.ObjectId,
})


module.exports= mongoose.model('Users',usersSchema)