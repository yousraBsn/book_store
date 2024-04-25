const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genrecontroller'); // Importation du contrôleur de genre

// Ajouter un genre
router.post('/addGenre', genreController.addGenre);

// Obtenir tous les genres
router.get('/getAllGenres', genreController.getAllGenres);

// Mettre à jour un genre
router.put('/updateGenre/:id', genreController.updateGenre);

// Supprimer un genre
router.delete('/deleteGenre/:id', genreController.deleteGenre);

module.exports = router;
