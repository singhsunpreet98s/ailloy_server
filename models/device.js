const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema
const deviceSchema = new mongoose.Schema({
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
      type: Number,
      required: false
   },
   lastValidLongitude: {
      type: Number,
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
   altitude: {
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
   previousCordinates: {
      type: Array,
      of: String
   }

}, { timestamps: true });
deviceSchema.set('toJSON', { virtuals: true });
deviceSchema.set('toObject', { virtuals: true });
deviceSchema.virtual('previousLocations').set(function (cordinates) {
   if (this.previousCordinates.length > 9) {
      this.previousCordinates.pop(-1);
      this.previousCordinates.unshift(cordinates);
   }
   else {
      this.previousCordinates.unshift(cordinates);
   }
})
deviceSchema.virtual('previousLocations').get(function () {
   let positions = [];
   try {
      if (this.previousCordinates.length !== null && this.previousCordinates.length !== undefined && this.previousCordinates.length > 0) {
         this.previousCordinates.forEach(position => {
            var positionArray = position.split(',');
            positions.push({ lat: positionArray[0], lng: positionArray[1] })
         });
      }
   }
   catch (err) {

   }
   return positions;
})
// userSchema.virtual('name').get(function () {
//    return `${this.firstName} ${this.lastName}`
// })
// userSchema.methods = {
//    authenticate: function (pass) {
//       return bcrypt.compareSync(pass, this.hashPassword)
//    }
// }
module.exports = mongoose.model('device', deviceSchema)