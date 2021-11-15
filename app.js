const express = require('express');
const app =express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');

const sauceRoute = require('./routes/sauceRoute');
const userRoute = require('./routes/userRoute');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

mongoose.connect('mongodb+srv://nikolla2502:156029@cluster0.kuvdm.mongodb.net/P6Piiquante?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }) 
    .then(() => console.log('Connexion à MongoDB réussie !')) 
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images')));

app.use('/api/sauces', sauceRoute);

app.use('/api/auth', userRoute);

app.use(helmet());

module.exports = app;