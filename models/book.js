const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
	author: {
		type: String,
		trim: true,
		required: true,
		minlength: 2,
		maxlength: 50,
		index: true,
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
		type: String,
		trim: true,
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
	// image: {
    //     type: String, 
    //     required: true,
    // },
});

module.exports = mongoose.model("Book", bookSchema);
