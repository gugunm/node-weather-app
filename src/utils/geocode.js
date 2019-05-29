const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ3VndW5tIiwiYSI6ImNqdnQ1emNwbzEzMzkzeW5ucWgycWdrZG4ifQ.RBgdFZ9zX_ygHu5Uc9KSyg'

    request({ url , json:true }, (error, { body }) => { //url menggunakan shorthand property ; response di destructuring ke body
        if(error) {
            callback('Unable to connect to the services!', undefined) //undefined untuk variable response
        } else if(body.features.length === 0) { // buat meriksa, apinya dengan lokasinya ada apa ngga
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, { //kalo sukses, return obj isinya latitude, longitude, place_name
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
