const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookcontroller');

// Route pour ajouter un livre avec une image
router.post('/add', bookController.addBook);
// Route pour lire tous les livres
router.get('/books', bookController.getAllBooks);

// Route pour mettre à jour un livre
router.put('/books/update', bookController.updateBook);

// Route pour supprimer un livre
router.delete('/books/delete', bookController.deleteBook);
// Route pour rechercher/filtrer les livres
router.get('/books/search', bookController.searchBooks);





module.exports = router;
