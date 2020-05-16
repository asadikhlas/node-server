const express = require('express');
const router = express.Router();
var path = require('path');
const mongoose = require('mongoose');
var productModel= require('./dbScehema')

router.use(express.json()) //For json data Transformation
router.use(express.urlencoded({ extended: true }))

router.get('/', (req, resp) => {
    async function getCar() {
        var result_Object=[]
        var abc=[{
            fullName: ''
        }]
        const product_Obj_Result = await productModel.find();

        product_Obj_Result.forEach(function (doc, err) {
            result_Object.push(doc)
        })
        console.log(result_Object)

        // resp.sendFile(path.join(__dirname+'carHub.com/views/index.pug'));
        resp.render('index', { result_Object, abc})
    }
    getCar();

});
module.exports = router;
