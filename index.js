const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');
const serverless = require('serverless-http');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Set up CORS
const corsOptions = {
    origin: '*', // You can specify the allowed origins here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Routes
app.use('/notes', notesRoutes);

// Export the app to be used by serverless
module.exports = app;
module.exports.handler = serverless(app);

// Optional: Keep the app running for local development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running fine on port: ${PORT}`);
    });
}
