//Packages needed for the application
const express = require('express');
const routes = require('./routes'); //Including all the routes 
const Sequelize = require('sequelize');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware for the application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//Connection to the database
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Server now listening'));
});