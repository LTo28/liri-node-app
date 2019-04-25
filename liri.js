require("dotenv").config()

const keys = require("./keys.js")
const axios = require("axios")
const moment = require("moment")
const Spotify = require('node-spotify-api');

//import spotify from './keys.js'

const [, , , artist] = process.argv

axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
  .then(({ data }) => {
    //console.log(data)
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



const spotify = new Spotify(keys.spotify)

spotify
  .search({ type: 'track', query: 'bohemian trapsody', limit: 1 })
  .then(({ tracks: { items } }) => {
    items.forEach(itemObj => {
      const { album, artists, name, external_urls } = itemObj
      console.log(album.name)
      console.log(artists)
      console.log(name)
      console.log(external_urls)

    })
  })
  .catch(e => console.log(e))
