// bookstore.routes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authmiddlewares');
const authController = require('../controllers/authcontroller');

// Route de création de compte (signup)
router.post('/signup', authController.signup);

// Route de connexion (signin)
router.post('/signin', authController.signin);

// Exemple de route protégée
router.get('/protected-route', authenticateToken, (req, res) => {
  // Code pour la route protégée ici
});

module.exports = router;
