const Author = require("../models/author"); // Importation du modèle d'auteur

// Ajouter un nouvel auteur
exports.addAuthor = async (req, res) => {
    try {
      
        const { name, bio } = req.body;
        
        // Créer une nouvelle instance d'auteur
        const newAuthor = new Author({
            name,
            bio,
        });

        // Enregistrer l'auteur dans la base de données
        await newAuthor.save();

        // Envoyer un message de succès
        // res.redirect('/author/getAllAuthors');
        res.status(201).json({ message: "L'auteur a été ajouté avec succès." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// Lire tous les auteurs
exports.getAllAuthors = async (req, res) => {
    try {
        // Récupérer tous les auteurs
        const authors = await Author.find();
        
        // Réponse avec la liste des auteurs
        res.render("manager/managerAuthor", { authors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un auteur
exports.updateAuthor = async (req, res) => {
    try {
        const { id } = req.params; // Utilisation de l'ID dans l'URL
        const { name, bio } = req.body;
        
        // Mettre à jour l'auteur avec les nouvelles valeurs
        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            { name, bio },
            { new: true } // Retourner le document mis à jour
        );

        if (!updatedAuthor) {
            return res.status(404).json({ message: "Auteur non trouvé." });
        }

        res.status(200).json({ message: "L'auteur a été mis à jour avec succès.", author: updatedAuthor });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un auteur
exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params; // Utilisation de l'ID dans l'URL
        
        // Supprimer l'auteur par ID
        const deletedAuthor = await Author.findByIdAndDelete(id);

        if (!deletedAuthor) {
            return res.status(404).json({ message: "Auteur non trouvé." });
        }

        res.status(200).json({ message: "L'auteur a été supprimé avec succès." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
