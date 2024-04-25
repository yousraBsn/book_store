const Genre = require("../models/genre"); // Importation du modèle de genre

// Ajouter un nouveau genre
exports.addGenre = async (req, res) => {
    try {
        const { categories } = req.body;
        
        // Créer une nouvelle instance de genre
        const newGenre = new Genre({
            categories,
        });

        // Enregistrer le genre dans la base de données
        await newGenre.save();

        // Envoyer un message de succès
        res.status(201).json({ message: "Le genre a été ajouté avec succès." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Lire tous les genres
exports.getAllGenres = async (req, res) => {
    try {
        // Récupérer tous les genres
        const genres = await Genre.find();
        
        // Réponse avec la liste des genres
        res.status(200).json(genres);
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

        res.status(200).json({ message: "Le genre a été mis à jour avec succès.", genre: updatedGenre });
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
