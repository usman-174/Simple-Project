//$$$$$$$$$$$$$$$$$$$$  Init $$$$$$$$$$$$$$$$$$$$$$$

const mongoose = require('mongoose');


//$$$$$$$$$$$$$$$$$$$$  Creating Table Schema $$$$$$$$$$$$$$$$$$$$$$$

const TableSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required: 'This field is required.'
    },
    email : {
        type : String,
        required : 'This field is required.',
    },
    mobile : {
        type : String,
    },
    city : {
        type : String,
    },
})



//$$$$$$$$$$$$$$$$$$$$  Creating Model $$$$$$$$$$$$$$$$$$$$$$$

const schema = mongoose.model('Table', TableSchema);

//$$$$$$$$$$$$$$$$$$$$  Exporting this table named model into server.js $$$$$$$$$$$$$$$$$$$$$$$

module.exports = schema;


