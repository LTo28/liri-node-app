require("dotenv").config()

const keys = require("./keys.js")
const axios = require("axios")
const moment = require("moment")
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify)

const [, , api, a] = process.argv

switch (api) {
  case 'concert-this':
    bands(a)
    break
  case 'spotify-this-song':
    music(a)
    break
}

function bands(a) {
  axios.get(`https://rest.bandsintown.com/artists/${a}/events?app_id=codingbootcamp`)
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
}


function music(a) {
  spotify
    .search({ type: 'track', query: `${a}`, limit: 5 })
    .then(({ tracks: { items } }) => {
      items.forEach(itemObj => {
        const { album, name, artists, external_urls: { spotify } } = itemObj
        console.log(`
      Artist(s): ${artists[0].name}
      Song: ${name}
      Link: ${spotify}
      Album: ${album.name}
      `)
      })
    })
    .catch(e => console.log(e))
}
