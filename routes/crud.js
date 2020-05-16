const express = require('express');
const router=express.Router();
const Joi = require('joi') //For Validation
const mongoose = require('mongoose');
var fs=require('fs');
var http =require('http')


router.use(express.json()) //For json data Transformation
router.use(express.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost:27017/car_db')
.then(() => console.log("Connected to Mongoose"))
.catch(() => console.log("Could not connected to mongoDB.."))

var ProductModel= require('./dbScehema')



//App Request this url for get data
router.post('/Check_Account/', (req, resp) => {

    console.log("Verify_Account__Helper_Method_Called()")
    console.log("Email = ",req.body.email)
    console.log("Password = ",req.body.password)
    
    // const result = validateLoginForm(req.body)
    // if (result.error) {
    //     resp.status(400).send("Validation required ! Please fill all Box")
    //     return;
    // }

    var result_Object=[]
    async function getCar()
    {
        const product_Obj_Result = await ProductModel.find({email:req.body.email,
             password:req.body.password});

        product_Obj_Result.forEach(function(doc,err)
        {
            result_Object.push(doc)
        })
        console.log(result_Object)
        // resp.render('index',{items : result})
        resp.redirect('/')

    }
    getCar();

}); 

router.get('/:car_Company', (req, resp) => {
    var result=[]
    const c=req.params.car_Company;   
    async function getCar(c)
    {
        const product_Obj_Result = await ProductModel.find({car_Company:req.params.car_Company});
        product_Obj_Result.forEach(function(doc,err)
            {
                result.push(doc.car_Name)
            })
        // console.log(result)
        // resp.render('index',{items : result})
        resp.send(result)
    }
    getCar();

});


//App Request this url for insert Post data
router.post('/addAccount/', (req, resp) => {
    console.log("AddAccount__Helper_Method_Called()")
    if (req.body.password != req.body.repassword)
    {
        resp.status(400).send("Your password does not match !!")
        return;
    }

    const result = validateCars(req.body)
    if (result.error) {
        resp.status(400).send("Validation required ! Please fill all Box")
        return;
    }

    async function addAccount(){
        const signUp_obj =new ProductModel
        ({
            fullName:req.body.name,
            email:req.body.email,
            password:req.body.password
        });

    const product_Result = await signUp_obj.save();
    console.log(product_Result)
    var result_Object=[]
    const product_Obj_Result = await ProductModel.find();
    product_Obj_Result.forEach(function(doc,err)
    {
        result_Object.push(doc)
    })
    console.log(result_Object)
    resp.render('index',{result_Object})
}   
    addAccount();
})

router.put('/:car', (req, resp) => {

    const car = car_Array.find(c => { return c.car_Name === (req.params.car) });
    console.log(req.body);
    console.log(car_Array);
    if (!car) {
        return resp.status(404).send("Car with given comapny is not found");
    }

    const result = validateCars(req.body)
    if (result.error) {
        resp.status(400).send("Validation required ! Please fill all Box")
        return;
    }

    car.car_Name = req.body.car_Name;
    console.log(car)
    resp.send(car)

})

router.delete('/:car_Name', (req, resp) => {
    const car = car_Array.find(c => { return c.car_Company === (req.params.car_Name) });
    console.log(car_Array)
    console.log(car)
    if (!car) {
        console.log(req.params.car_Name)
        resp.status(404).send("Car with given comapny is not found");
    }

    const index = car_Array.indexOf(car);
    car_Array.splice(index, 1)
    resp.send(car)
})

function validateCars(addObject_obj) {
    const checking_Joi =
    {
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        repassword: Joi.string().required()
        
    };
    return result = Joi.validate(addObject_obj, checking_Joi);
}

function validateLoginForm(addObject_obj) {
    const checking_Joi =
    {
        email: Joi.string().required(),
        password: Joi.string().required(),
        
    };
    return result = Joi.validate(addObject_obj, checking_Joi);
}

module.exports=router;
