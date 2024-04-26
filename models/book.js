const mongoose = require('mongoose');
// Schéma du livre
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ISBN: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    publicationDate: {
        type: Date,
        required: true,
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "genre", // Référence au modèle de l'auteur
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (val) {
                return val > 0;
            },
            message: "Price must be greater than 0",
        },
    },
    stockQuantity: {
        type: Number,
        required: true,
        validate: {
            validator: function (val) {
                return val >= 0;
            },
            message: "Stock quantity cannot be negative",
        },
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "author", // Référence au modèle de l'auteur
        required: true,
    },
    image: {
        type: String 
      }
});

module.exports = mongoose.model("book", bookSchema);