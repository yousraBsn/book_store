const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genrecontroller'); // Importation du contrôleur de genre
const multer = require('multer'); 

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageGenre/'); // Définir le répertoire de destination pour enregistrer les fichiers
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliser le nom de fichier d'origine
    }
});

const upload = multer({ storage: storage });

// Ajouter un genre
router.post('/addGenre',upload.single("image"), genreController.addGenre);

// Obtenir tous les genres
router.get('/getAllGenres', genreController.getAllGenres);
router.get('/getAllGenresManager', genreController.getAllGenresManager);

// Mettre à jour un genre
router.post('/updateGenre/:id', genreController.updateGenre);

// Supprimer un genre
router.delete('/deleteGenre/:id', genreController.deleteGenre);
router.get('/filterByCategory', genreController.filterByCategory); // Route avec un paramètre de requête

module.exports = router;
