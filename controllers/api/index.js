const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);

module.exports = router;
