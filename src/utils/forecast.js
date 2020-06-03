const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const key = "91bba791100a83b65f20d657ee89ae3c";
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${latitude},${longitude}`;
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log("success");
           callback(undefined, ` It is currently ${response.body.current.temperature} degress out. But it feels like ${response.body.current.feelslike} degrees. The humidity is ${response.body.current.humidity}`)
        }
    })
}

module.exports = forecast