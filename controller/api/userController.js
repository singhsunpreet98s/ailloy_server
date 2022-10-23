const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { validationResult } = require('express-validator')
const { setPermissions, getPermissions } = require('../../helpers/userPermissions')
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
                  userPermissions = await getPermissions(user);
                  return res.json({
                     msg: "success",
                     data: {
                        token: token,
                        user: {
                           role: role,
                           fullName: `${firstName} ${lastName}`,
                           email: email,
                           phone: phone,
                           permissions: userPermissions,
                           devices: devices,
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
      let permissionObject = {
         maps: {
            view: true,
            edit: false,
            delete: false,
         },
         dashboard: {
            view: true,
            edit: false,
            delete: false,
         },
         trips: {
            view: true,
            edit: false,
            delete: false,
         },
         noPermission: {
            view: false,
            edit: false,
            delete: false,
         }
      }
      setPermissions(user, permissionObject);
      // setting userPermissions

      return res.json({ msg: 'success', data: user })
   }
   catch (err) {
      console.log(err)
      return res.json({ msg: 'There was error while creating account' })
   }
}
