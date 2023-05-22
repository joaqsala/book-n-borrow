const router = require('express').Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/search', searchRoutes);

module.exports = router;
