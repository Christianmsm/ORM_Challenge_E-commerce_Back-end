//Packages needed for the application
const express = require('express');
const Sequelize = require('sequelize');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware for the application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(apiRoutes);

//Connection to the database
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log('Server now listening'));
});