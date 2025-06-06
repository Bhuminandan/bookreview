const ReviewService = require('../services/review.service');
const { successResponse } = require('../utils/responseHandler');

class ReviewController {
    async updateReview(req, res, next) {
        try {
            await ReviewService.updateReview(req.body, req.params.id, req.user.id);
            return successResponse(res, 'Review updated successfully');
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

    async createReview(req, res, next) {
        try {
            const review = await ReviewService.createReview(req.body, req.params.id, req.user.id);
            return successResponse(res, review, 201);
        } catch (error) {
            return next(error);
        }
    }

    async deleteReview(req, res, next) {
        try {
            await ReviewService.deleteReview(req.params.id);
            return successResponse(res, 'Review deleted successfully');
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new ReviewController();