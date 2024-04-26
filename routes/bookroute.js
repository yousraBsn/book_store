const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookcontroller');
const multer = require('multer'); 

// Configuration de multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'image/'); // Définir le répertoire de destination pour enregistrer les fichiers
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Utiliser le nom de fichier d'origine
    }
});

const upload = multer({ storage: storage });


// Route pour ajouter un livre avec une image
router.post('/add',upload.single("image"), bookController.addBook);
// Route pour lire tous les livres
router.get('/books', bookController.getAllBooks);
router.get('/booksByGenre/:genreId', bookController.booksByGenre);


// Route pour mettre à jour un livre
router.put('/books/update', bookController.updateBook);

// Route pour supprimer un livre
router.delete('/books/delete', bookController.deleteBook);
// Route pour rechercher/filtrer les livres
router.get('/books/search', bookController.searchBooks);





module.exports = router;
