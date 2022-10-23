const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
   cordinates: {
      type: String,
      min: 3,
      max: 50,
      required: true
   },
   address: {
      type: String,
      mix: 2,
      max: 20,
      required: true
   },
   state: {
      type: String,
      min: 2,
      max: 50,
      required: true
   },
   country: {
      type: String,
      required: true
   },
   tz_id: {
      type: String,
      min: 5,
      max: 20,
      required: true
   },


}, { timestamps: true });

module.exports = mongoose.model('location', locationSchema)