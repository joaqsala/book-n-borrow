const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const bookRoutes = require('./api/bookRoutes');  // Updated this line

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api/book', bookRoutes);

module.exports = router;