import BadRequest from "../errors/BadRequest.js";

async function pagination(req, res, next) {
	try {
		let { limit = 5, page = 1, sort = "_id:-1" } = req.query;

		let [sortingField, order] = sort.split(":");

		limit = parseInt(limit);
		page = parseInt(page);
		order = parseInt(order);

		const result = req.result;

		if (limit > 0 && page > 0) {
			const paginationResult = await result
				.find()
				.sort({ [sortingField]: order })
				.skip((page - 1) * limit)
				.limit(limit)
				.exec();
			res.status(200).json(paginationResult);
		} else {
			next(new BadRequest());
		}
	} catch (error) {
		next(error);
	}
}

export default pagination;
