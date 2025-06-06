const BookService = require('../services/book.service');
const { successResponse } = require('../utils/responseHandler');

class BookController {
    async getAllBooks(req, res, next) {
        // Get pagination atrributes
        // and author and genere
        const page = req.query.page || 1;
        const size = req.query.size || 10;
        
        const author = req.body?.author || "";
        const genre = req.body?.genre || "";

        try {
            const books = await BookService.getAllBooks(
                page,
                size,
                author,
                genre
            );
            return successResponse(res, books);
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const book = await BookService.createBook(req.body);
            return successResponse(res, book, 201);
        } catch (err) {
            next(err);     
        }
    }

    async search(req, res, next) {
        try {
            const books = await BookService.searchBooks(req.body);
            return successResponse(res, books);
        } catch (error) {
            return next(error);
        }
    }

    async submitReview(req, res, next) {
        try {
            const review = await ReviewService.createReview(req.body);
            return successResponse(res, review, 201);
        } catch (error) {
            return next(error);
        }
    }

    async getDetails(req, res, next) {
        try {
            const bookId = req.params.id;
            const page = parseInt(req.query.page) || 1;
            const size = parseInt(req.query.size) || 5;
            const book = await BookService.getDetails(bookId, page, size);
            return successResponse(res, book);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new BookController();