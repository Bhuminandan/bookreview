const { Book, User} = require('../models');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');

class BookService {
    static async getAllBooks(page, size, author, genre) {
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
}

module.exports = BookService;