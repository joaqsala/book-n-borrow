const router = require('express').Router();
const { Book, Renter } = require('../../models');
const withAuth = require('../../utils/auth');


 // Get books using the field name (chosen by user in dropdown) and value 
router.get('/search', async (req, res) => {
    try {
        const { fieldName, newInfo } = req.body;

        const bookData = await Book.findAll({
        [fieldName] : newInfo
    });
        if (!bookData) {
        res.status(404).json({ message: 'There are no books for the given search parameters.' });
        return;
        }
        
        res.status(200).json(bookData);

    } catch (err) {
    res.status(500).json(err);
    }
});

//adds a new book to db
router.post('/loaner', withAuth, async (req, res) => {
    try {
    const newBook = await Book.create({
        ...req.body,
        user_id: req.session.user_id,
    });

    res.status(200).json(newBook);
    } catch (err) {
    res.status(400).json(err);
    }
});

 // books user has chosen to rent 
router.post('/', withAuth, async (req, res) => {
    try {
        const rentData = await Renter.create({ 
            book_id: req.params.id,
            renter_id: req.session.user_id,
    });
        res.status(200).json(rentData);

    } catch (err) {
    res.status(500).json(err);
    }
});


module.exports = router;