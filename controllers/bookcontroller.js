const Book = require('../models/book');

exports.addBook = async (req, res) => {
    try {
        const { title, author, ISBN, publicationDate, genre, price, stockQuantity } = req.body;
        // Créer une nouvelle instance de livre
        const newBook = new Book({
            title,
            author,
            ISBN,
            publicationDate,
            genre,
            price,
            stockQuantity,
            image: "Chemin_de_l_image" // Ajouter le chemin de l'image à l'objet du livre si nécessaire
        });
       // Enregistrer le livre dans la base de données
        await newBook.save();
       // Envoyer un message de succès
        res.status(201).json({ message: "Le livre a été ajouté avec succès." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Lire tous les livres
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
    try {
        const { id, title, author, ISBN, publicationDate, genre, price, stockQuantity } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(id, {
            title,
            author,
            ISBN,
            publicationDate,
            genre,
            price,
            stockQuantity
        }, { new: true });
        
        if (!updatedBook) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }

        res.status(200).json({ message: "Le livre a été mis à jour avec succès.", book: updatedBook });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }

        res.status(200).json({ message: "Le livre a été supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Rechercher/filtrer les livres
exports.searchBooks = async (req, res) => {
    try {
        const { title, author, genre } = req.query;

        // Construire l'objet de requête en fonction des critères fournis
        const query = {};
        if (title) query.title = { $regex: title, $options: 'i' }; // Recherche de titre insensible à la casse
        if (author) query.author = { $regex: author, $options: 'i' }; // Recherche d'auteur insensible à la casse
        if (genre) query.genre = { $regex: genre, $options: 'i' }; // Recherche de genre insensible à la casse

        // Effectuer la recherche dans la base de données
        const books = await Book.find(query);

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
