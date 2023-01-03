const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const express = require('express');
const { default: mongoose } = require('mongoose');
const productModel = require('../models/productModel');
const userModel = require('../models/usersModel');
const router = express.Router();

router.post('/login', (req, res, next) => {
    userModel.find({
        emailAddress: req.body.emailAddress,

    }).then(user => {
        console.log(user);
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Authentication failed'
            })
        }
        res.status(200).json({
            message: "Updated successfully",
            result: user
        })
    })
})

router.post('/signup', (req, res, next) => {
    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        address: req.body.address,
        _id: new mongoose.Types.ObjectId(),
        password:req.body.password
    })

        user.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: "User created successfully",
                result: result
            });
        }).catch(err => console.log(err))        

    

});
// router.post('/signup', (req, res, next) => {
//     const user = new userModel({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         dateOfBirth: req.body.dateOfBirth,
//         emailAddress: req.body.emailAddress,
//         phoneNumber: req.body.phoneNumber,
//         gender: req.body.gender,
//         address: req.body.address,
//         _id: new mongoose.Types.ObjectId(),
//         password:req.body.password,
//        password: bcrypt.hash(req.body.password,10,)
        
//         // (err,hash)=>{
//         // if (err){
//         //     return res.status(500),json({
//         //         message:err
//         //     })


//         // }else{
//             user.save().then(result => {
//                 console.log(result);
//                 res.status(201).json({
//                     message: "User created successfully",
//                     result: result
//                 });
//             }).catch(err => console.log(err))        

//         // }
//     }),
        

// })
// // });

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    userModel.findById(id).exec().then(doc => {
        console.log(doc)
        res.status(200).json({
            message: "Created" + id,
            id: id,
            result: doc
        });
    }).catch(err => console.log(err))
});

router.get('/', (req, res, next) => {
    userModel.find().then(doc => {
        console.log(doc)
        res.status(200).json({
            message: "successful",
            users: doc

        });
    })
});

router.patch('/:id', (req, res, next) => {
    res.status(200).json({
        message: 'user successfully updated'
    })
});

// profile/id

router.patch('/profile/:id', (req, res, next) => {
    const id = req.params.id
    userModel.updateOne({
        _id: id
    }, {
        $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender
        }
    }).then(doc => {
        console.log(doc)
        res.status(200).json({
            message: 'Profile updated',
            result: doc
        })
    })

});


router.delete('/:id', (req, res, nest) => {
    const id = req.params.id
    userModel.findByIdAndRemove({ _id: id })
        .then(doc => {
            console.log(doc)
            res.status(200).json({
                message: 'Profile deleted',
                result: doc
            })
        })

});




module.exports = router