const mongoose = require('mongoose');
const bookModel = require('./book'); // Assurez-vous d'importer le modèle du livre

// Schéma de l'auteur
const genreSchema = new mongoose.Schema({
    categories: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
});

// Middleware pour suppression en cascade
genreSchema.pre('findOneAndDelete', async function (next) {
    const genreId = this._conditions._id; // Obtenez l'ID du genre à supprimer
    
    // Supprimez tous les livres qui sont associés à ce genre
    await bookModel.deleteMany({ genre: genreId });

    next(); // Continuez avec la suppression du genre
});

module.exports = mongoose.model("genre", genreSchema);
