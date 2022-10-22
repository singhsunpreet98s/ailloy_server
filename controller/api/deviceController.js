const Device = require('../../models/device');
const { validationResult } = require('express-validator');
exports.addDevice = (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      console.log(new Date().toISOString());
      return res.status(400).json({ errors: errors.array() });
   }
   const { imei, name, expirationDate } = req.body;
   const device = new Device({
      imei: imei,
      name: name,
      expirationDate: expirationDate,
      addedBy: req.user._id,
   });
   device.save();
   res.status(201).json({
      status: 1,
      data: {
         id: device._id,
         name: device.name,
         imei: device.imei,
         active: device.active,
         isDeleted: device.isDeleted,
         speed: device.speed,
         engine: device.engine
      }
   });
}
exports.getDevice = (req, res, next) => {

}
exports.getDevicesOfUser = (req, res, next) => {

}
exports.updateDevice = (req, res, next) => {

}