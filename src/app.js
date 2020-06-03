const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


//define paths for express config
const indexDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setting up static directory 
app.use(express.static(indexDir)); //connects to the files in indexDir

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nayomal'
    });
})

app.get('/about', (req,res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Nayomal'
    })
})

app.get('/help', (req,res) =>{
    res.render('help' ,{
        title: 'Help',
        name: 'Nayomal',
        helpText: 'This page shows help'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
    if (error) {
        return res.send({error});
    }
    forecast(latitude,longitude,(error, forecastData) =>{
        if (error) {
            res.send({error});
        }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
})
})

app.get('/products', (req, res) => {
    if (!req.query.search){
         return res.send({ //return is essential as to prevent sending 2 http requests. therefore the function breaks from here.
            error: "You need to provide the search term"
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

//404 page error

app.get('*', (req,res) => {
    res.send('Error 404');
})

// app.get('', (req, res) =>{
//     res.send('Hello Express!');
// })

// app.get('/help', (req, res) =>{
//     res.send('Hello Express! Help');
// })


// app.get('/about', (req, res) =>{
//     res.send('Hello Express!');
// })



app.listen(3000, () => {
    console.log('Server is on port: 30000');
})