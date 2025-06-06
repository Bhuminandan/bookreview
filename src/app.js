const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const errorHandler = require('./middlewares/error.middleware');
require('dotenv').config(); 

// Importing routes
const authRoutes = require('./routes/auth.route');
const bookRoutes = require('./routes/book.route');

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

// Registering routes
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);

app.use(errorHandler); 

// Starting the server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Unable to connect to the database:', err));