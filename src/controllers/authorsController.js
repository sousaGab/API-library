import NotFound from "../errors/NotFound.js";
import { authors } from "../models/index.js";

class AuthorController {
	static listAuthors = async (req, res, next) => {
		try {
			const resultAuthors = authors.find();
			req.result = resultAuthors;
			next();
		} catch (error) {
			next(error);
		}
	};

	static listAuthorById = async (req, res, next) => {
		try {
			const id = req.params.id;
			const resultAuthor = await authors.findById(id);

			if (resultAuthor !== null) {
				res.status(200).send(resultAuthor);
			} else {
				next(new NotFound("Author id not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static registerAuthor = async (req, res, next) => {
		try {
			let author = new authors(req.body);
			const resultAuthor = await author.save();
			res.status(201).send(resultAuthor.toJSON());
		} catch (error) {
			next(error);
		}
	};

	static updateAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const resultAuthor = await authors.findByIdAndUpdate(id, {
				$set: req.body,
			});

			if (resultAuthor !== null) {
				res.status(200).send({
					message: "successfully updated author",
				});
			} else {
				next(new NotFound("Author id not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static deleteAuthor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const resultAuthor = await authors.findByIdAndDelete(id);

			if (resultAuthor !== null) {
				res.status(200).send({
					message: "successfully removed author",
				});
			} else {
				next(new NotFound("Author id not found"));
			}
		} catch (error) {
			next(error);
		}
	};
}

export default AuthorController;
