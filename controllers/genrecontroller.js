const Genre = require("../models/genre"); // Importation du modèle de genre

// Ajouter un nouveau genre
exports.addGenre = async (req, res) => {
    try {
        const { categories } = req.body;
        const image = req.file ? req.file.path : null;
        // Créer une nouvelle instance de genre
        const newGenre = new Genre({
            categories,
            image
        });

        // Enregistrer le genre dans la base de données
        await newGenre.save();

        // Envoyer un message de succès
        res.redirect('/genre/getAllGenresManager');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les genres
exports.getAllGenres = async (req, res) => {
    try {
        // Récupérer tous les genres
        const genres = await Genre.find();
        
        // Render the 'genre.ejs' view with the genres
        res.render('index', { genres });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllGenresManager = async (req, res) => {
    try {
        // Récupérer tous les genres
        const genres = await Genre.find();
        
        // Render the 'genre.ejs' view with the genres
        res.render('manager/managerGenre', { genres });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Mettre à jour un genre
exports.updateGenre = async (req, res) => {
    try {
        const { id } = req.params; // Utilisation de l'ID dans l'URL
        const { categories } = req.body;
        
        // Mettre à jour le genre avec les nouvelles valeurs
        const updatedGenre = await Genre.findByIdAndUpdate(
            id,
            { categories },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedGenre) {
            return res.status(404).json({ message: "Genre non trouvé." });
        }

        res.redirect('/genre/getAllGenresManager');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un genre
exports.deleteGenre = async (req, res) => {
    try {
        const { id } = req.params; // Utilisation de l'ID dans l'URL
        
        // Supprimer le genre par ID
        const deletedGenre = await Genre.findByIdAndDelete(id);

        if (!deletedGenre) {
            return res.status(404).json({ message: "Genre non trouvé." });
        }

        res.status(200).json({ message: "Le genre a été supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Fonction pour filtrer les livres par catégorie
exports.filterByCategory = async (req, res) => {
  try {
    const { category } = req.query; // Récupérer la catégorie du paramètre de requête

    let books;
    if (category && category !== "") {
      // Rechercher les livres par catégorie
      const genre = await Genre.findOne({ categories: category });
      if (genre) {
        books = await Book.find({ genre: genre._id }); // Obtenir les livres avec ce genre
      } else {
        return res.status(404).json({ message: "Category not found." });
      }
    } else {
      // Si aucune catégorie n'est fournie, retourner tous les livres
      books = await Book.find({});
    }

    // Renvoyer la liste des livres au client
    res.render('books', { books }); // Rendu de la vue avec les livres
  } catch (error) {
    res.status(500).json({ message: "Error filtering by category.", error });
  }
};
