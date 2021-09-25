const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    Title: {
        type: 'string',
        required: true,
        maxLength: 75,
    },
    Images: {
      type: "array",
      required: true,
    },
    Price: {
      type: "string",
      required: true,
    },
    Currency: {
      type: "string",
      default: "USD",
    },
    Category: {
      type: "string",
      required: true,
    },
    Designer: {
      type: "string",
      required: true,


    },
    Company: {
      type: "string",
      default: "girly things"
    },
    Like_count: {
      type: "number",
      default: 0,
    },
    Sales_count: {
      type: "number",
      default: 0,
    },
    
  
})
  

const items = mongoose.model('test559',itemSchema);



module.exports = { items }