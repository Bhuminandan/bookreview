const express = require('express')
const router = express.Router();
const BookController = require('../controllers/book.controller');

// Validation imports
const { bookValidator } = require('../validators/book.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

router.get('/', authMiddleware, BookController.getAllBooks);
router.post('/', authMiddleware, bookValidator, validate, BookController.create);
router.post('/search', BookController.search);
// router.get('/:id', BookController.getBookById);
// router.put('/:id', BookController.updateBook);
// router.delete('/:id', BookController.deleteBook);

module.exports = router
