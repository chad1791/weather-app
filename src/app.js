const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//setting up the path for the public folder.
const dirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//set hbs as the views engine

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//directing exress to the public path

app.use(express.static(dirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Home Page",
        name: "Edgar A. Chan"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Edgar A. Chan"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "Edgar A. Chan"
    });
})

app.get('/weather', (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: "You have to provide an address!"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location,
                queryString: req.query.address
            })
        })
    })

    /*res.send({

    })*/
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: "Edgar A. Chan",
        msg: "Help article not found",
        style: "../css/style.css"
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        name: "Edgar A. Chan",
        msg: "Error 404, page not found! :(",
        style: "css/style.css"
    })
})

app.listen(3000, () => {
    console.log('The server has been set to listen in port 3000');
});

