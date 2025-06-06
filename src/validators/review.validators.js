const { body } = require('express-validator');

exports.reviewValidator = [
    body('rating').notEmpty().withMessage('rating is required'),
    body('comment').notEmpty().withMessage('comment is required'),
]