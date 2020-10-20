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


//$$$$$$$$$$$$$$$$$$$$ Laying Pipes $$$$$$$$$$$$$$$$$$$$$$$

router.get('/home', (req, res) => {
    res.render('home', { title: 'Form' ,
    result : table})
})
router.post('/form', [
    check('fullname').not().isEmpty().trim().escape(),
    check('mobile').not().isEmpty().trim(),
    check('city').not().isEmpty().trim().escape(),
    check('email').isEmail().normalizeEmail()

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            errors: errors.array()
        });
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
        })

    }





});



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
router.get('/form/:id', (req, res) => {
   
    table.findById(req.params.id, (err, result) => {
        if (!err) {
            res.render('home', {
                title: 'Edit Data',
                result: result
            }
            )
        }else{
            res.json({
                err : err
            })
        }
    })
})


//$$$$$$$$$$$$$$$$$$$$ Exporting Router model $$$$$$$$$$$$$$$$$$$$$$$

module.exports = router;


