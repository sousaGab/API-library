import mongoose from "mongoose";

const AuthorSchema = mongoose.Schema(
	{
		id: { type: String },
		name: { type: String, required: [true, "Author name is required"] },
		nationality: { type: String },
	},
	{
		versionKey: false,
	}
);

const authors = mongoose.model("authors", AuthorSchema);

export default authors;
