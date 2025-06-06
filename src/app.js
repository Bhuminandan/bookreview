const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config(); 

// App configuration
const app = express();
app.set('title', 'My Express App');
app.set('description', 'This is a sample Express application');

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: process.env.CORS_CREDENTIALS === 'true'
}));
app.use(bodyParser.json());


// Starting the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Unable to connect to the database:', err));