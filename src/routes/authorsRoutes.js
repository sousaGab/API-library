import express from "express";
import AuthorController from "../controllers/authorsController.js";
import pagination from "../middleware/pagination.js";

const router = express.Router();

router
	.get("/authors", AuthorController.listAuthors, pagination)
	.get("/authors/:id", AuthorController.listAuthorById, pagination)
	.post("/authors", AuthorController.registerAuthor)
	.put("/authors/:id", AuthorController.updateAuthor)
	.delete("/authors/:id", AuthorController.deleteAuthor);

export default router;
