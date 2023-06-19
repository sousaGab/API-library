import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class BookController {
	static listBooks = async (req, res, next) => {
		try {
			const searchBooks = books.find();
			req.result = searchBooks;
			next();
		} catch (error) {
			next(error);
		}
	};

	static listBookById = async (req, res, next) => {
		try {
			const id = req.params.id;
			const resultBooks = await books
				.findById(id, {}, { autopopulate: false })
				.populate("author", "name");

			if (resultBooks !== null) {
				res.status(200).send(resultBooks);
			} else {
				next(new NotFound("Book id not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static registerBook = async (req, res, next) => {
		try {
			let book = new books(req.body);
			const resultBook = await book.save();
			res.status(201).send(resultBook.toJSON());
		} catch (error) {
			next(error);
		}
	};

	static updateBook = async (req, res, next) => {
		try {
			const id = req.params.id;
			const resultBooks = await books.findByIdAndUpdate(id, {
				$set: req.body,
			});

			if (resultBooks !== null) {
				res.status(200).send({ message: "successfully updated book" });
			} else {
				next(new NotFound("Book id not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static deleteBook = async (req, res, next) => {
		try {
			const id = req.params.id;
			const resultBooks = await books.findByIdAndDelete(id);
			if (resultBooks !== null) {
				res.status(200).send({ message: "successfully removed book" });
			} else {
				next(new NotFound("Book id not found"));
			}
		} catch (error) {
			next(error);
		}
	};

	static listBookByFilter = async (req, res, next) => {
		try {
			const search = await searchParams(req.query);

			if (search !== null) {
				const resultBooks = await books.find(search);

				req.result = resultBooks;

				if (resultBooks !== null) {
					next();
				} else {
					next(new NotFound("Book id not found"));
				}
			} else {
				res.status(200).send([]);
			}
		} catch (error) {
			next(error);
		}
	};
}

async function searchParams(params) {
	const { publisher, title, minPages, maxPages, authorsName } = params;

	let search = {};

	if (publisher) search.publisher = { $regex: publisher, $options: "i" };
	if (title) search.title = { $regex: title, $options: "i" };
	if (minPages || maxPages) search.pages = {};
	if (minPages) search.pages.$gte = minPages;
	if (maxPages) search.pages.$lte = maxPages;

	if (authorsName) {
		const author = await authors.findOne({ name: authorsName });

		if (author !== null) {
			search.author = author._id;
		} else {
			search = null;
		}
	}

	return search;
}
export default BookController;
