const Device = require('../../models/device');
const { validationResult } = require('express-validator');
exports.addDevice = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const { imei, name, expirationDate } = req.body;
      const device = new Device({
         imei: imei,
         name: name,
         expirationDate: expirationDate,
         addedBy: req.body.user._id,
      });
      await device.save();
      res.status(201).json({
         status: 1,
         data: {
            id: device._id,
            name: device.name,
            imei: device.imei,
            active: device.active,
            isDeleted: device.isDeleted,
            lastValidLatitude: null,
            lastValidLongitude: null,
            engineOnAt: null,
            engineOffAt: null,
            engineStatusChangedAt: null,
            speed: device.speed,
            altitude: null,
            engine: device.engine
         }
      });
   }
   catch (err) {
      res.status(501).json({
         status: 0
      });
   }

}
exports.getDevice = (req, res, next) => {

}
exports.getDevicesOfUser = (req, res, next) => {

}
exports.updateDeviceLocation = async (req, res, next) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }
   try {
      const user = req.body.user;
      const { imei, latitude, longitude, speed, altitude } = req.body;
      let device = await Device.findOne({ imei: imei })
      if (device === null) {
         return res.status(401).json({ status: 0 })
      }
      device.lastValidLatitude = latitude;
      device.lastValidLongitude = longitude;
      device.speed = speed;
      device.altitude = altitude;
      device.previousLocations = `${latitude},${longitude}`;
      let data = await device.save();
      return res.status(201).json({ status: 1 })
   }
   catch (err) {

   }
   return res.status(501).json({ status: 0 })
}