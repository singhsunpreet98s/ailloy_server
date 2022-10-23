const axios = require('axios');
var url = 'https://weatherapi-com.p.rapidapi.com/current.json';

const Location = require('../models/location')
module.exports = {
   async getlocation(latitude, longitude) {

      const locations = await Location.findOne({ cordinates: `${latitude},${longitude}` });
      if (locations === null || locations === undefined) {
         const options = {
            method: 'GET',
            url: url,
            params: { q: `${latitude},${longitude}` },
            headers: {
               'X-RapidAPI-Key': process.env.RAPIDAPIKEY,
               'X-RapidAPI-Host': process.env.RAPIDAPIHOST
            }
         };
         const response = await axios.request(options).catch(function (error) {
            console.error(error);
         });
         let location = new Location({
            cordinates: `${latitude},${longitude}`,
            address: response.data.location.name,
            country: response.data.location.country,
            state: response.data.location.region,
            tz_id: response.data.location.tz_id
         });
         await location.save();
         // await database.addLocation({ lat: latitude, lng: latitude, region: response.data.location.name, country: response.data.location.country, state: response.data.location.region })
         return {
            cordinates: `${latitude},${longitude}`,
            address: response.data.location.name,
            country: response.data.location.country,
            state: response.data.location.region,
            tz_id: response.data.location.tz_id
         };

      }
      return locations;
   }
}
