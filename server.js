require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//const multer  = require('multer');
//const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes
const authRoutes = require('./routes/userroute');
const bookRoutes = require('./routes/bookroute'); 
const authorRoutes = require('./routes/authorroute'); 
const genreRoutes = require('./routes/genreroute'); 
const clientRoutes = require('./routes/clientroute'); 
// Middleware
app.use(express.json());
app.use(express.static('public'))

app.use('/image', express.static('image'));
app.use('/imageGenre', express.static('imageGenre'));
// Routes middleware
app.use('/auth', authRoutes);
app.use('/book', bookRoutes);
app.use('/author', authorRoutes);
app.use('/genre', genreRoutes);
app.use('/client', clientRoutes);
// MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        res.redirect('/genre/getAllGenres'); 
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporter le serveur pour les tests
module.exports = server;
