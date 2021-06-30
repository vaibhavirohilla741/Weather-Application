const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weatherApi = require('./utils/weather')
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vaibhavi Rohilla'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vaibhavi Rohilla'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vaibhavi Rohilla'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Provide Address"
        })
        
    }
    geocode(req.query.address, (error,{latitude, longitude, location}={}) => {
        if (error) {
          return res.send({error})
        }
        weatherApi(longitude, latitude, (error, weatherData) => {
          if (error) {
            return res.send({error});
          }
          return res.send({
            location,
            weatherData
          })
            
        });
      });

    })
    


app.get("/products", (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name:'Raju',
        errorMessage:'Help article not found'
    })
    
})
app.get("*", (req,res) => {
    res.render('404',{
        title:'404',
        name:'Raju',
        errorMessage:'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})