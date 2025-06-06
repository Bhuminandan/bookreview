const { Book, User, Review} = require('../models');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

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
        const reviews = await Review.findAll({
            where: {
                book_id: id,
            },
            limit: size,
            offset: (page - 1) * size,
            order: [['created_at', 'DESC']],
        })

        const [result] = await Review.findAll({
        where: { book_id: id },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('rating')), 'averageRating']],
        raw: true,
        });
        const averageRating = result?.averageRating ? parseFloat(result.averageRating).toFixed(2) : null;

        return {
            book,
            reviews,
            averageRating
        };
    }
}

module.exports = BookService;