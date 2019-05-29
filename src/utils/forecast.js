const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1f02460bc55c164637c57cebbe8fe337/' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude)

    request({ url, json:true }, (error, { body }) => { //url menggunakan shorthand property ; response di destructuring ke body
        if(error){
            callback('Unable to connect to the service!', undefined)
        } else if(body.error) {
            callback('Unable to find Coordinate!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' There is a ' + body.currently.precipProbability + '% chance of rain')
        }
    })
}

module.exports = forecast