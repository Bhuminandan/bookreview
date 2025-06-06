const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');

// Validation imports
const { reviewValidator } = require('../validators/review.validators');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

router.put('/:id', authMiddleware, reviewValidator, validate, ReviewController.updateReview);
router.delete('/:id', authMiddleware, ReviewController.deleteReview);

module.exports = router