import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookSchema = new mongoose.Schema({
	id: { type: String },
	title: { type: String, required: [true, "Book title is required"] },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "authors",
		required: [true, "Book author is required"],
		autopopulate: { select: "name" },
	},
	publisher: { type: String, required: [true, "Book publisher is required"] },
	pages: {
		type: Number,
		validate: {
			validator: (value) => {
				return value >= 10 && value <= 5000;
			},
			message: "The number of pages must be between 10 and 5000",
		},
	},
	type: {
		type: String,
		enum: {
			values: ["ebook", "physicist"],
			message: "The type {VALUE} is not allowed",
		},
	},
});

bookSchema.plugin(autopopulate);
const books = mongoose.model("books", bookSchema);

export default books;
