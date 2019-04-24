require("dotenv").config()

const keys = require("./keys.js")
const axios = require("axios")
const moment = require("moment")

//const spotify = new Spotify(keys.spotify)

axios.get(`https://rest.bandsintown.com/artists/skrillex/events?app_id=codingbootcamp`)
  .then(({ data, datetime }) => {
    console.log(data)
    data.forEach(venueObj => {
      const { venue: { name, city, region, country }, datetime } = venueObj
      console.log(`
        Name: ${name}
        Location: ${city} ${region} ${country}
        When: ${moment(datetime).format('MM/DD/YYYY hh:mm a')}
      `)
    })
  })
  .catch(e => console.log(e))