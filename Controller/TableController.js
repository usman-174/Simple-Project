//$$$$$$$$$$$$$$$$$$$$  Init $$$$$$$$$$$$$$$$$$$$$$$

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const parser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
const { check, validationResult, Result } = require('express-validator');
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

//$$$$$$$$$$$$$$$$$$$$ Requiring Important MODELS $$$$$$$$$$$$$$$$$$$$$$$

const table = require('../model/table');
const { insertMany, update } = require('../model/table');


//$$$$$$$$$$$$$$$$$$$$ Laying Pipes $$$$$$$$$$$$$$$$$$$$$$$

router.get('/home', (req, res) => {
    res.render('home', { title: 'Form' ,
    result : table})
})
router.post('/form', [
    check('fullname' , 'Full name must have atleast 7 characters').isLength({min:7}).not().isEmpty().escape(),
    check('mobile' , 'This must be numeric ').not().isEmpty().isNumeric().trim(),
    check('city' , ' Please enter a valid City name').not().isEmpty().escape().isLength({min:3}),
    check('email','This must be an email').isEmail().normalizeEmail()
], (req, res) => {
    
        Insert(req,res) 
   
});

function Insert(req,res) {
    const errors = validationResult(req);
    const request = req.body
    if (!errors.isEmpty()) {
        res.render('onError',{title : 'Form Fill', error : errors.mapped(), result : table , req : request })
        
    } else {
         
        var tables = new table({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            city: req.body.city,
        })
       
        tables.save((err, result) => { 
            if (!err)
                res.redirect('/list')
            else {
                console.log(err);
            }
        }); 
    }
};

router.post('/:id', async (req,res,next)=>{
    req.table = await table.findById(req.params.id)
    next()
     
    }, editandupdate('edit'));

router.get('/edit/:id', async (req,res)=>{
 
    const blog = await table.findById(req.params.id)
    res.render('edit',{result : blog,
        title : 'Edit'})
});
function editandupdate(path) { 
    return  async (req,res)=>{
        let table = req.table
        table.fullname = req.body.fullname
        table.email = req.body.email
        table.mobile = req.body.mobile
        table.city = req.body.city
        
            try{
                table = await table.save((err, result) => { 
                    if (!err)
                    res.redirect('/list')
                        
                    else {
                        res.json(err);
                    }
                })
                
            }catch(err){
               console.log(err)
                res.render(`${path}`, {result : table})
                
            }
    }
} 


 
router.get('/list', (req, res) => {

    table.find((err, result) => {
        if (!err) {
            res.render('list', {
                title: 'Data',
                result: result
            })
        } else {
            console.log(`Error while Getting user data ${err}`)
        }
    })
})

router.get('/form/delete/:id',(req,res)=>{
    table.findByIdAndRemove(req.params.id,(err,result)=>{
        if (!err) {
            res.redirect('/list')
        }else{
            res.json(err);
        }
    })
})

//$$$$$$$$$$$$$$$$$$$$ Exporting Router model $$$$$$$$$$$$$$$$$$$$$$$

module.exports = router;


