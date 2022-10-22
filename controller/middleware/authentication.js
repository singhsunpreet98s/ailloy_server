const jwt = require('jsonwebtoken');
const User = require('../../models/user');
exports.superAdminAuthentication = async (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, process.env.JWTKEY, async (err, decoded) => {
         if (err) {
            return res.json({ msg: 'token expired' })
         }
         if (decoded) {
            let user = await User.findOne({ _id: decoded._id });
            if (user.isSuperAdmin) {
               req.user = user;
               next()
            }
            else {
               return res.json({ msg: "you doesn't have permission", status: 0 })
            }

         }
      })
   }
   catch (err) {

      return res.status(501).json({ msg: 'authentication error' })
   }
}
exports.managerAuthentication = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
         if (err) {
            return res.json({ msg: 'token expired' })
         }
         if (decoded) {
            let User = User.findById(req.body._user_id);
            if (User.isManager) {
               req.body.user = User;
               next()
            }
            else {
               return res.json({ msg: "you doesn't have permission", status: 0 })
            }

         }
      })
   }
   catch (err) {
      console.log(err)
      return res.status(501).json({ msg: 'whoops something went wrong' })
   }
}
exports.adminAuthentication = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
         if (err) {
            return res.json({ msg: 'token expired' })
         }
         if (decoded) {
            let User = User.findById(req.body._user_id);
            if (User.isAdmin) {
               req.body.user = User;
               next()
            }
            else {
               return res.json({ msg: "you doesn't have permission", status: 0 })
            }

         }
      })
   }
   catch (err) {
      console.log(err)
      return res.status(501).json({ msg: 'whoops something went wrong' })
   }
}
exports.authenticate = (req, res, next) => {
   try {

      if (req.headers.authorization) {
         const token = req.headers.authorization.split(" ")[1]
         jwt.verify(token, process.env.JWTKEY, (err, decoded) => {
            if (err) {
               return res.json({ msg: 'token expired' })
            }
            if (decoded) {
               let User = User.findById(req.body._user_id);
               req.body.user = User;
               next()
            }
         })
      }
      else {
         res.status(401).json({ msg: "failed to authenticate user" })
      }
   }
   catch (err) {
      res.status(501).json({ msg: "error", error: err })

   }
}