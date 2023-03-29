const path = require('path');
const express = require("express");
const hbs = require('hbs');
const {geocode} = require("./utils/geocode")
const {forecast} = require("./utils/forecast")

const app = express();
const port = process.env.PORT || 3000

// define paths for express config
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
const publicFolderPath = path.join(__dirname,"../public")

// setup handlebars views and location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath)

// setup the detault directory - displays index if no route is given
app.use(express.static(publicFolderPath));

app.get('', (req, res)=>{
    res.render("index",{title:"Weather", name:"Alan Strong"});
});

app.get('/about', (req, res)=>{
    res.render("about",{title:"About", name:"Alan Strong"});
});

app.get('/help', (req, res)=>{
    res.render("help",{title:"Help", helpText: "Host for the Help page", name:"Alan Strong"});
});

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({error: "address must be provided."})
    }
    geocode(req.query.address, (error, {longtitude,latitude} ={}) => {
        if(error){
            // return res.send(error);
            // Had to pay for geocode web call so not using it any longer, just using a default for now
            latitude = 55;
            longtitude = -2;
        } 
        forecast(latitude, longtitude, (error, {location, temperature, feelsLike, description} = {}) => {
            if(error){
                return res.send(error);
            } 
            return res.send({
                address:req.query.address, location, description, temperature, feelsLike});
        }) 
    })
});

app.get('/help/*', (req, res)=>{
    res.render("errors", {errorMessage:"Unable to find the requested help page.", title:"404 Help", name:"Alan Strong"});
});

app.get('*', (req, res)=>{
    res.render("errors", {errorMessage: "A 404 eror has occured. Page not found.", title:"404", name:"Alan Strong"});
});

app.listen(port, () => {
    console.log("Server has started on port " + port)
})