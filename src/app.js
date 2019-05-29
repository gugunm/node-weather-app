const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// ======================
// console.log(__dirname) //print path directory yang sedang dibuka
// console.log(path.join(__dirname, '../public')) //print path directory public (untuk file HTML)
// =======================

const app  = express()
const port = process.env.PORT || 3000 // heroku pake env.port, local pake 3000

// define paths for Express Configs
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs') // set HBS sebagai view engine yang akan digunakan (dinamic web page)
app.set('views', viewsPath)   // merubah folder acuan untuk views menjadi 'templates'
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

// ini bakalan nge routes otomatis sesuai dengan nama file htmlnya, index.html milik si root, jadi ngga butuh di route lagi disininya
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gugun Mediamer'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gugun Mediamer'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text.',
        title: 'Help Page',
        name: 'Gugun Mediamer'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide address term!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // harus dikasih default value, untuk handle distructuring objectnya.
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecatsData) => {
            if(error){
                return res.send({error})
            }
    
            res.send({
                forecast: forecatsData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide the search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// handle link error (page 404) sengaja di taro di akhir
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Gugun Mediamer',
        errorText: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Gugun Mediamer',
        errorText: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Serving on port '+ port)
})