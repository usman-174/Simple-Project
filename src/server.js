//$$$$$$$$$$$$$$$$$$$$  Init $$$$$$$$$$$$$$$$$$$$$$$
const express = require('express');
const app = express();
const logger = require('morgan');
const ejs = require('ejs');
const parser = require('body-parser');
const path = require('path');
const port = 8000;
const mongoose = require('mongoose');
const url = 'mongodb+srv://usman1:speed123@nodejs.sfhyc.mongodb.net/Contact?retryWrites=true&w=majority'

//$$$$$$$$$$$$$$$$$$$$  Connecting to MongoDB $$$$$$$$$$$$$$$$$$$$$$$

mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
})
    .then((result) => {
        app.listen(port, (req, res) => {
            console.log('----------------------------')
            console.log('Connected to the Port :' + port)
            console.log('----------------------------')
        });
        console.log('----------------------------')
        console.log('CONNECTED OT MONGO ALTAS');
    })
    .catch((err) => {
        console.log(err)
    });


//$$$$$$$$$$$$$$$$$$$$ Requiring Important MODELS $$$$$$$$$$$$$$$$$$$$$$$


const Controller = require('../Controller/TableController');

//$$$$$$$$$$$$$$$$$$$$  Requiring View Engine $$$$$$$$$$$$$$$$$$$$$$$


const templates = path.join(__dirname, '../templates/views');


//$$$$$$$$$$$$$$$$$$$$  MiddleWare Setup $$$$$$$$$$$$$$$$$$$$$$$

    app.use(express.static('public'));
    app.use(parser.urlencoded({ extended : true}));
    app.use(parser.json());
    
    app.use(logger('common'));
    

    app.set("view engine", "ejs");
    app.set("views", templates);

 

//$$$$$$$$$$$$$$$$$$$$ Laying Pipes $$$$$$$$$$$$$$$$$$$$$$$

app.use('/', Controller);
app.get('/',(req,res)=>{
    res.redirect('/list')
})
