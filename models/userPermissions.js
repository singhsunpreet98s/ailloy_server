const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const userPermissionsSchema = new mongoose.Schema({
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   name: {
      type: String,
      mix: 3,
      max: 50,
      required: true
   },
   view: {
      type: Boolean,
      required: true,
      default: false
   },
   edit: {
      type: Boolean,
      required: true,
      default: false
   },
   delete: {
      type: Boolean,
      required: true,
      default: false
   },


}, { timestamps: true });

module.exports = mongoose.model('userPermissions', userPermissionsSchema)