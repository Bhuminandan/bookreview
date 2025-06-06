const { body } = require('express-validator');

exports.bookValidator = [
    body('title').notEmpty().withMessage('title is required'),
    body('author').notEmpty().withMessage('author is required'),
    body('genre').notEmpty().withMessage('genre is required'),
    body('created_by').notEmpty().isString().withMessage('created_by is required as string'),
]