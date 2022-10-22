const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const userSchema = new mongoose.Schema({
   currentDriver: {
      type: String,
      min: 3,
      max: 40,
      required: false
   },
   imei: {
      type: String,
      mix: 3,
      max: 20,
      required: true
   },
   name: {
      type: String,
      min: 5,
      max: 50,
      required: true
   },
   expirationDate: {
      type: String,
      required: true
   },
   lastValidLatitude: {
      type: mongoose.Types.Decimal128,
      required: false
   },
   lastValidLongitude: {
      type: mongoose.Types.Decimal128,
      required: false
   },
   engine: {
      type: String,
      enum: ['off', 'on'],
      default: 'off'
   },
   engineOnAt: {
      type: Date,
      required: false
   },
   engineOffAt: {
      type: Date,
      required: false
   },
   engineStatusChangedAt: {
      type: Date,
      required: false
   },
   speed: {
      type: Number,
      default: 0
   },
   addedBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
   },
   active: {
      type: Boolean,
      default: false
   },
   isDeleted: {
      type: Boolean,
      default: false
   },

}, { timestamps: true });
// userSchema.virtual('password').set(function (pass) {
//    this.hashPassword = bcrypt.hashSync(pass, 8)
// })
// userSchema.virtual('name').get(function () {
//    return `${this.firstName} ${this.lastName}`
// })
// userSchema.methods = {
//    authenticate: function (pass) {
//       return bcrypt.compareSync(pass, this.hashPassword)
//    }
// }
module.exports = mongoose.model('device', userSchema)