const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const location = require('./helpers/getLocation')
const app = express();

try {
   dotEnv.config();
   const mongoUrl = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.2nq7bt1.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;
   mongoose.connect(mongoUrl).catch(e => {
      console.log(e);
   })
   // new SqlLite();
   app.set('view engine', 'pug');
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
   app.use('/', require('./routes/frontendRoutes'));
   app.use('/api', require('./routes/apiRoutes'));
   app.get('/test', async function (req, res) {
      res.status(201).json(await location.getlocation(34.396643, 76.888450));
   })
}
catch (e) {
   console.log(e);
}
app.listen(process.env.PORT, () => {
   console.log('App is running on localhost:' + process.env.PORT);
})
module.exports = app;
