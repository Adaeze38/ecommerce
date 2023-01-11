const express = require('express');
const { default: mongoose } = require('mongoose');
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel')
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to /orders'
    });
});

router.post("/", (req, res, next) => {
    productModel.findById(req.body.productId)
      .then(product => {
        if (!product) {
          return res.status(404).json({
            message: "Product not found"
          });
        }
        const order = new orderModel({
          _id: mongoose.Types.ObjectId(),
          quantity: req.body.quantity,
          product: req.body.productId
        });
        return order.save();
      })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Order stored",
          createdOrder: {
            _id: result._id,
            product: result.product,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:4000/orders/" + result._id
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

// router.post('/', (req, res, next) => {
//     const goods = new orderModel({
//         productId: req.body.productid,
//         quantity:req.body.quantity,
//         _id :new mongoose.Types.ObjectId()
        
//     })
//     goods.save().then(result=>{
//         console.log(result);
//         res.status(201).json({
//             message:"Orders created successfully",
//             result
//         });
//     }).catch(err=> console.log(err))

  
// });

// router.post('/:id', (req, res, next) => {
//     const id = req.params.id
//     res.status(200).json({
//         message: "Orders created successfully" + id,
//         id:id,
//       
//     });
// });

router.patch('/profile/:id',(req,res,next)=> {
    const id = req.params.id
    orderModel.updateOne({
       _id:id},{$set:{firstName:req.body.firstName,
       lastName:req.body.lastName,
       gender:req.body.gender}
    }).then(doc => {
        console.log(doc)
        res.status(200).json({
            message:'Profile updated',
            result:doc
        })
    })
    
    });


    router.delete('/:id',(req,res,nest)=> {
        const id = req.params.id
        orderModel.findByIdAndRemove({_id:id})
        .then(doc =>{
            console.log(doc)
            res.status(200).json({
                message:'Profile deleted',
                result:doc
            })
        })
       
    });


module.exports = router