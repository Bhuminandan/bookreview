const { deleteReview } = require('../controllers/review.controller');
const { Review, User, Book } = require('../models');
const AppError = require('../utils/appError');

class ReviewService {
    static async updateReview({ rating, comment }, id, user_id) {
       const review = await Review.findOne({
        where : {
            id,
            user_id
        }
       })
       if (!review) throw new AppError('Review not found', 404);
       const res = await review.update({ rating, comment });
       return res;
    }

    static async createReview({ rating, comment }, book_id, user_id) {
        const book = await Book.findByPk(book_id);
        if (!book) throw new AppError('Book not found', 404);

        const user = await User.findByPk(user_id);
        if (!user) throw new AppError('User not found', 404);

        const exitsReviewForBook = await Review.findOne({ where: { book_id, user_id } });
        if (exitsReviewForBook) throw new AppError('Review already exists', 409);

        const review = await Review.create({ rating, comment, book_id, user_id });
        return review;
    }

    static async deleteReview(id) {
        await Review.destroy({ where: { id } });
    }
}

module.exports = ReviewService;