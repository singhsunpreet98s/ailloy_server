const UserPermissions = require('../models/userPermissions')
module.exports = {

   async getPermissions(user) {

      userPermissions = await UserPermissions.find({ userId: user._id });
      let permissionObject = {
         maps: {
            view: false,
            edit: false,
            delete: false,
         },
         dashboard: {
            view: false,
            edit: false,
            delete: false,
         },
         trips: {
            view: false,
            edit: false,
            delete: false,
         },
         noPermission: {
            view: true,
            edit: false,
            delete: false,
         }
      }
      try {
         if (user.isSuperAdmin || user.isAdmin) {
            permissionObject = {
               maps: {
                  view: true,
                  edit: true,
                  delete: true,
               },
               dashboard: {
                  view: true,
                  edit: true,
                  delete: true,
               },
               trips: {
                  view: true,
                  edit: true,
                  delete: true,
               },
               noPermission: {
                  view: false,
                  edit: false,
                  delete: false,
               }
            }
            return permissionObject;
         }
         else {
            for (var i = 0; i < userPermissions.length; i++) {
               switch (userPermissions[i].name) {
                  case "maps":
                     permissionObject.maps.view = userPermissions[i].view;
                     permissionObject.maps.edit = userPermissions[i].edit;
                     permissionObject.maps.delete = userPermissions[i].delete;
                     break;
                  case "dashboard":
                     permissionObject.dashboard.view = userPermissions[i].view;
                     permissionObject.dashboard.edit = userPermissions[i].edit;
                     permissionObject.dashboard.delete = userPermissions[i].delete;
                     break;
                  case "trips":
                     permissionObject.trips.view = userPermissions[i].view;
                     permissionObject.trips.edit = userPermissions[i].edit;
                     permissionObject.trips.delete = userPermissions[i].delete;
                     break;
                  default:
                     break;
               }
            };
         }
      }
      catch (err) {

      }
      return permissionObject;
   },
   async setPermissions(user, permissions) {
      try {
         for (const [key, value] of Object.entries(permissions)) {
            userPermission = new UserPermissions({
               userId: user._id,
               name: key,
               view: value.view,
               edit: value.edit,
               delete: value.delete
            });
            await userPermission.save()
         }
         return 1;
      }
      catch (err) {

      }
      return 0;
   }
}