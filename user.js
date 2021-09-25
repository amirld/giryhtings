const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: 'string',
        required: true,
    },
    Last_name: {
        type: 'string',
        required: true,
    },
    Email: {
        type: 'string',
        required: true,
    },
    Password: {
        type: 'string',
        required: true,
    },
    Liked_items : {
        type: "array",
        default: [],
    },
    Cart_items : {
        type: "array",
        default: [],
    },
    Ordered_items : {
        type: "array",
        default: [],
    },
    Edit_promotion : {
        type: "boolean",
        default: false,
    }


})

const users = mongoose.model('users',userSchema);



module.exports = users