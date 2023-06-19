import express from "express";
import BookController from "../controllers/booksController.js";
import pagination from "../middleware/pagination.js";

const router = express.Router();

router
	.get("/books", BookController.listBooks, pagination)
	.get("/books/search", BookController.listBookByFilter, pagination)
	.get("/books/:id", BookController.listBookById)
	.post("/books", BookController.registerBook)
	.put("/books/:id", BookController.updateBook)
	.delete("/books/:id", BookController.deleteBook);

export default router;
