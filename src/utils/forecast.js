const request = require("request");

const forecast = (latitude, longtitude, callback)=>{
    const weatherstackApiUrl = "http://api.weatherstack.com/current?access_key=89c75d114124f364672fc56b47c63e81";
    coords = latitude + "," + longtitude; 
    const url = weatherstackApiUrl + "&query=" + coords;

    request({url, json: true}, (error, {body}={}) => {
        if(error){
            callback("Unable to connect.", undefined)
        }else if(body.current === 0){
            callback("Unable to locate weather forecast for the location:" + coords, undefined)
        }else {
        callback(
            undefined, 
            {
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                location: body.location.name + ", " + body.location.country,
                description: body.current.weather_descriptions[0].toLowerCase(),
            });
        }
    })

}

module.exports = {
    forecast: forecast
}