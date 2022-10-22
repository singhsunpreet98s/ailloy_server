const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const device = require('./device');
const userSchema = new mongoose.Schema({
   firstName: {
      type: String,
      min: 3,
      max: 20,
      required: true
   },
   lastName: {
      type: String,
      mix: 3,
      max: 20,
      required: true
   },
   email: {
      type: String,
      min: 5,
      max: 50,
      required: true
   },
   hashPassword: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      min: 5,
      max: 20,
      required: true
   },
   role: {
      type: String,
      enum: ['user', 'admin', 'manager', 'super_admin'],
      default: 'user'
   },
   isDeleted: {
      type: Boolean,
      default: false
   }

}, { timestamps: true });
userSchema.virtual('password').set(function (pass) {
   this.hashPassword = bcrypt.hashSync(pass, 8)
})
userSchema.virtual('name').get(function () {
   return `${this.firstName} ${this.lastName}`
})
userSchema.virtual('isAdmin').get(function () {
   return this.role === 'admin';
})
userSchema.virtual('isSuperAdmin').get(function () {
   return this.role === 'super_admin';
})
userSchema.virtual('isManager').get(function () {
   return this.role === 'manager';
})
userSchema.virtual('devices').get(async function () {
   if (this.role === 'super_admin' || this.role === 'admin') {
      return await device.find({ isDeleted: false }).select('name imei expirationDate engine speed active');
   }
   return [];
})
userSchema.methods = {
   authenticate: function (pass) {
      return bcrypt.compareSync(pass, this.hashPassword)
   }
}
module.exports = mongoose.model('user', userSchema)