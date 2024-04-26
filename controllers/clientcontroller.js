const Book = require("../models/book"); // Modèle du livre

const Client = require("../models/client");

// Mettre à jour la quantité de stock après un achat
exports.updateQt = async (req, res) => {
    try {
        const { bookId, quantityPurchased } = req.body;

        // Trouver le livre par son identifiant
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Livre non trouvé." });
        }

        if (book.stockQuantity < quantityPurchased) {
            return res.status(400).json({ message: "Stock insuffisant pour compléter l'achat." });
        }

        // Déduire la quantité achetée du stock existant
        book.stockQuantity -= quantityPurchased;

        // Sauvegarder le livre avec le nouveau stock
        await book.save();

        res.status(200).json({ message: "Stock mis à jour après l'achat.", book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addClient = async (req, res) => {
    try {
        const { name, numeroCart, address, quantite, id_book } = req.body;

        const newClient = new Client({
            name,
            numeroCart,
            address,
            quantite,
            id_book, // Inclure id_book si nécessaire
        });

        await newClient.save(); // Sauvegarder le nouveau client

        res.status(201).json({
            message: "Client créé avec succès.",
            client: newClient,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getOrder = async (req, res) => {
    try {
        const { id } = req.params; // Obtenir l'identifiant de la commande à partir des paramètres de requête

        // Rechercher la commande par son ID et peupler les champs de référence (comme id_book)
        const order = await Client.findById(id).populate('id_book');

        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée.' });
        }

        res.status(200).json({
            message: 'Commande trouvée avec succès.',
            order, // Retourner les détails de la commande
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};