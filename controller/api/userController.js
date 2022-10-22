const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { validationResult } = require('express-validator');
exports.login = async (req, res, next) => {
   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body
      await User.findOne({ email: email })
         .exec(async (err, user) => {
            if (err) {
               return res.status(501).json({ msg: 'there was some error' })
            }
            if (user) {
               if (user.authenticate(password)) {
                  const token = jwt.sign({ _id: user._id, admin: user.admin }, process.env.JWTKEY, { expiresIn: '1d' })
                  const { role, firstName, lastName, email, phone } = user
                  let devices = await user.devices;
                  return res.json({
                     msg: "success",
                     data: {
                        token: token,
                        user: {
                           role: role,
                           fullName: `${firstName} ${lastName}`,
                           email: email,
                           phone: phone,
                           devices: devices
                        }
                     }
                  })
               }
               else {
                  return res.json({ msg: 'invalid pass' })
               }
            }
            else {
               return res.json({ msg: 'invalid email' })
            }
         })
   }
   catch (err) {
      res.json({ msg: 'error' })
   }
}
exports.signup = async (req, res, next) => {

   try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
      }
      // return res.json({ msg: 'success' })
      const { firstName, lastName, email, password, phone } = req.body;
      const user = new User({
         firstName: firstName,
         lastName: lastName,
         email: email,
         password: password,
         phone: phone
      });
      await user.save()
      return res.json({ msg: 'success', data: user })
   }
   catch (err) {
      console.log(err)
      return res.json({ msg: 'There was error while creating account' })
   }
}
exports.adminLogin = async (req, res, next) => {
   try {
      const { email, password } = req.body
      await User.findOne({ email: email })
         .exec((err, user) => {
            if (err) {
               return res.json({ msg: 'error' })
            }
            if (user) {
               if (user.authenticate(password)) {
                  const token = jwt.sign({ _id: user._id, admin: user.admin }, process.env.JWTKEY, { expiresIn: '1d' })

                  // const cart = Cart.find({ user: user._id })

                  if (user.admin) {
                     const { firstName, lastName, email, phone } = user
                     return res.json({
                        msg: "success",
                        data: {
                           token: token,
                           user: {

                              fullName: `${firstName} ${lastName}`,
                              email: email,
                              phone: phone,
                              cart: []
                           }
                        }
                     })
                  }
                  else {
                     return res.json({ msg: 'invalid user' })
                  }
               }
               else {
                  return res.json({ msg: 'invalid pass' })
               }
            }
            else {
               return res.json({ msg: 'invalid email' })
            }
         })
   }
   catch (err) {
      res.json({ msg: 'error' })
   }
}