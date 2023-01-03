const express = require('express');
const { default: mongoose } = require('mongoose');
const { request } = require('../../app');
const orderModel = require('../models/orderModel');
const router = express.Router();

router.get('/',(req,res,next) => {
    res.status(200).json({
        message: 'Handling GET request to /orders'
    });
});


router.post('/', (req, res, next) => {
    const goods = new orderModel({
        productId: req.body.productid,
        quantity:req.body.quantity,
        _id :new mongoose.Types.ObjectId()
        
    })
    goods.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Orders created successfully",
            result
        });
    }).catch(err=> console.log(err))

  
});

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