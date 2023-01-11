const express = require('express');
const { default: mongoose } = require('mongoose');
const Product = require('../models/productModel');
const router = express.Router();
const multer = require('multer')
// const upload = multer({dest:'/uploads/'})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
    }
  });

  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

router.get('/', (req, res, next) => {
    Product.find().then(doc => {
        console.log(doc) 
        res.status(200).json({
            message: "successful",
          product:doc
        
        });
    })
});

router.post('/', upload.single('productImage'), (req, res, next) => {
    
    console.log(req.file)
    const goods = new Product({
        name: req.body.name,
        price:req.body.price,
        productImage:req.file.path,
        _id :new mongoose.Types.ObjectId()
        
    })
    goods.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:"Products created successfully",
            result
        });
    }).catch(err=> console.log(err))

  
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Product.findById(id).exec().then(doc =>{
        console.log(doc)
        res.status(200).json({
            message: "Handling GET request to /products/" + id,
            id:id,
           result: doc
        });
    }) .catch(err=> console.log(err))
   
});

router.patch('/profile/:id',(req,res,next)=> {
    const id = req.params.id
    productModel.updateOne({
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
        productModel.findByIdAndRemove({_id:id})
        .then(doc =>{
            console.log(doc)
            res.status(200).json({
                message:'Profile deleted',
                result:doc
            })
        })
       
    });


module.exports=router