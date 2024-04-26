const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorcontroller');

// Ajouter un auteur
router.post('/addAuthor', authorController.addAuthor);

// Mettre à jour un auteur
router.put('/updateAuthor/:id', authorController.updateAuthor); // Utiliser PUT avec un paramètre d'ID

// Obtenir tous les auteurs
router.get('/getAllAuthors', authorController.getAllAuthors); // Assurez-vous que c'est un GET

// Supprimer un auteur
router.delete('/deleteAuthor', authorController.deleteAuthor); // Utiliser DELETE avec un paramètre d'ID

module.exports = router;
