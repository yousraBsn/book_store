require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

// Routes
const authRoutes = require('./routes/userroute');
const bookRoutes = require('./routes/bookroute'); 
const authorRoutes = require('./routes/authorroute'); 
const genreRoutes = require('./routes/genreroute'); 
// Middleware
app.use(express.json());
app.use(express.static('public'))

// Routes middleware
app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/author', authorRoutes);
app.use('/genre', genreRoutes);
// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporter le serveur pour les tests
module.exports = server;
