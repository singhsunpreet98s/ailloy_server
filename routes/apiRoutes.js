const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { signup, login } = require('../controller/api/userController');
const { addDevice, updateDeviceLocation } = require('../controller/api/deviceController');
const { superAdminAuthentication, authenticate } = require('../controller/middleware/authentication');
router.post('/user/signup',
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
   body('firstName').isLength({ min: 2 }),
   body('lastName').isLength({ min: 2 }),
   body('phone').isLength({ min: 5 }),
   signup)

router.post('/user/login',
   body('email').isEmail(),
   body('password').isLength({ min: 5 }),
   login)
router.post('/device/addDevice',
   body('name').isLength({ min: 5 }),
   body('expirationDate').isISO8601().toDate(),
   body('imei').isIMEI(),
   superAdminAuthentication, addDevice)
router.post('/device/updateLocation',
   body('imei').isLength({ min: 5 }),
   body('latitude').isDecimal(),
   body('longitude').isDecimal(),
   body('altitude').isInt(),
   body('speed').isInt(),
   authenticate, updateDeviceLocation)
module.exports = router;