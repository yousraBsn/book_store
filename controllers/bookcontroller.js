const Book = require('../models/book');
const Author = require('../models/author'); // Importation du modèle d'auteur
const Genre = require('../models/genre');

exports.addBook = async (req, res) => {
    try {
        const { title, authorName, genreName, ISBN, publicationDate, price, stockQuantity } = req.body;
        const image = req.file ? req.file.path : null;
         // Recherche du genre par nom
        const genre = await Genre.findOne({ categories: genreName });
        if (!genre) {
            return res.status(404).json({ message: "Genre non trouvé." });
        }
        // Recherche de l'auteur par nom
        const author = await Author.findOne({ name: authorName });
        if (!author) {
            return res.status(404).json({ message: "Auteur non trouvé." });
        }

        // Créer le nouvel enregistrement de livre avec les ObjectIds trouvés
        const newBook = new Book({
            title,
            author: author._id, // Utilisez l'ObjectId de l'auteur
            ISBN,
            publicationDate,
            genre: genre._id, // Utilisez l'ObjectId du genre
            price,
            stockQuantity,
            image
        });

        // Sauvegarder le nouveau livre
        await newBook.save();

        
        res.redirect('/book/booksManager');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



// Lire tous les livres avec leurs auteurs et genres
exports.getAllBooks = async (req, res) => {
    try {
        // Récupérer les livres avec leurs auteurs et genres
        const books = await Book.find()
            .populate("author", "name") // Récupérer le nom de l'auteur
            .populate("genre", "categories"); // Récupérer la catégorie du genre

            res.render('books', { books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.booksManager = async (req, res) => {
    try {
        // Récupérer les livres avec leurs auteurs et genres
        const books = await Book.find()
            .populate("author", "name") // Récupérer le nom de l'auteur
            .populate("genre", "categories"); // Récupérer la catégorie du genre

            res.render('manager/managerBook', { books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lire tous les livres avec leurs auteurs et genres
exports.booksByGenre = async (req, res) => {
    try {
        // Récupérer l'ID du genre depuis la requête
        const genreId = req.params.genreId;

        // Récupérer les livres avec leurs auteurs et genres filtrés par l'ID du genre
        const books = await Book.find({ genre: genreId })
            .populate("author", "name") // Récupérer le nom de l'auteur
            .populate("genre", "categories"); // Récupérer la catégorie du genre

        res.render('booksByGenre', { books });
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
        const { title, authorName, genreName } = req.query;

        // Construire l'objet de requête
        const query = {};
        
        // Recherche de titre insensible à la casse
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        // Rechercher par nom d'auteur
        if (authorName) {
            const author = await Author.findOne({ name: { $regex: authorName, $options: 'i' } });
            if (author) {
                query.author = author._id;
            } else {
                return res.status(404).json({ message: "Auteur non trouvé." });
            }
        }

        // Rechercher par nom de genre
        if (genreName) {
            const genre = await Genre.findOne({ categories: { $regex: genreName, $options: 'i' } });
            if (genre) {
                query.genre = genre._id;
            } else {
                return res.status(404).json({ message: "Genre non trouvé." });
            }
        }

        // Effectuer la recherche dans la base de données
        const books = await Book.find(query).populate('author').populate('genre');

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
