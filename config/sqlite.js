const sqlite3 = require('sqlite3').verbose();
let db = null;
class SqlLite {
   constructor() {
      this.db = new sqlite3.Database(':memory', err => {
         if (err) return console.error(err.message);
      });
   }
   addLocation({ lat, lng, region, country, state }) {
      let cordinates = `${lat},${lng}`;
      try {
         this.db.run(`INSERT INTO locations(cordinates,state,region,country) VALUES(?,?,?,?)`, [cordinates, state, region, country], function (err) {
            if (err) {
               return 0;
            }
            return 1;
         });
      }
      catch (err) {
         console.log(err);
      }
   }
   getLocation(lat, lng) {
      let cordinates = `${lat},${lng}`;
      try {
         this.db.each(`SELECT * FROM locations WHERE cordinates = '${cordinates}' limit 1`, (err, row) => {
            if (err) {
               return null;
            }
            return row;
         });
      }
      catch (e) {
         console.log(e);
      }
   }
}
module.exports = { SqlLite };
