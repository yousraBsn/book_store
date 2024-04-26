const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    numeroCart: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
    },
    id_book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book", // Référence au modèle de livre
        required: false,
    },
});

module.exports = mongoose.model("client", clientSchema);
