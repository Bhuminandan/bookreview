const express = require('express')
const router = express.Router();
const BookController = require('../controllers/book.controller');
const ReviewController = require('../controllers/review.controller');

// Validation imports
const { bookValidator } = require('../validators/book.validator');
const { reviewValidator } = require('../validators/review.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

router.post('/', authMiddleware, bookValidator, validate, BookController.create);
router.get('/', BookController.getAllBooks);
router.get('/search', BookController.search);
router.post('/:id/reviews', authMiddleware, reviewValidator, validate, ReviewController.createReview);
router.get('/:id', BookController.getDetails);

module.exports = router
