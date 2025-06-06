const { Book, User} = require('../models');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');

class BookService {
    static async getAllBooks(page, size, author, genre) {
        // Dinamically generating where clause
        const where = {};
        if (author) where.author = author;
        if (genre) where.genre = genre;

        const books = await Book.findAll({
            where,
            limit: size,
            offset: (page - 1) * size,
        });

        return books;
    }

    static async createBook({ title, author, genre, created_by }) {
        // Check if user exists
        const user = await User.findOne({
            where: {
                id: created_by
            }
        });
        if (!user) throw new AppError('User not found', 404);

        const book = await Book.create({ title, author, genre, created_by });
        return book;
    }

    static async searchBooks({ title, author }) {

        // Case-insensitive search on title and author, allowing partial matches
        const books = await Book.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.iLike]: `%${title}%` } },
                    { author: { [Op.iLike]: `%${author}%` } },
                ],
            },
        });
        return books;
    }

    static async getDetails(id, page, size) {
        const book = await Book.findByPk(id);
        if (!book) throw new AppError('Book not found', 404);

        // Average rating
        const reviews = await book.getReviews({
            limit: size,
            offset: (page - 1) * size
        })
        const total = reviews.length;
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = total > 0 ? sum / total : 0;
        book.dataValues.averageRating = averageRating;  
        return book;
    }
}

module.exports = BookService;