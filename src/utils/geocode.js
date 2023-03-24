const request = require("request");

const geocode = (address, callback) =>{
    const mapboxToken = "pk.eyJ1IjoiYWxhbm1zdHJvbmciLCJhIjoiY2xmaWlwejF4MmQwYjN3bjFvN3lhdXlldyJ9.4bw7aSGREfOsoIKIwzTcjw" //if not working create account and get new token
    address = address.replace(/, /g,"%20")
    address = address.replace(/ /g,"%20")
    address = address.replace(/,/g,"%20")
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address  + ".json?access_token=" + mapboxToken + "&types=address"

    request({url, json:true}, (error, {body}={}) =>{
        if(error){
            callback({error:"unable to connect to the coordinate provider." + error}, undefined)
        } else if(body.features === undefined){
            callback({error:"Unable to find coordinates for the address provided - " + body.message}, undefined);
        } else {
            callback(undefined, {
                    latitude: body.features[0].center[1],
                    longtitude: body.features[0].center[0],
                    location: body.features[0].place_name,
                }
            );
        }
    })
}

module.exports = {
    geocode
};
