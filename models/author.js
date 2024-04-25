const mongoose = require('mongoose');
// Schéma de l'auteur
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
});

module.exports = mongoose.model("author", authorSchema);
