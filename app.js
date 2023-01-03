const express= require ('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/users');

// app.use((req,res,next)=>{
//     res.status(200).json({
//         message:'ecommerce endpoint running'
//     })
// })
mongoose.connect('mongodb+srv://ADAEZE:adorables38@cluster0.fimszkh.mongodb.net/?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     if (req.methods === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
//         return res.status(200).json({});
//     }
// })

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users',userRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=> {
    res.status(error.status|| 500)
    res.json({
        error:{
            message :error.message
        }
    })
})
module.exports = app;