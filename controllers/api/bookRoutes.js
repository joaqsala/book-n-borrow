const router = require('express').Router();
const { User, Book, Renter } = require('../../models');
const withAuth = require('../../utils/auth');
const fetch = require('node-fetch');


 // Get books using the field name (chosen by user in dropdown) and value 
router.post('/search', async (req, res) => {
    try {
        const { fieldName, newInfo } = req.body;

        const bookData = await Book.findAll({
            where: {
                available: true,
            },
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

//adds a new book to db (add withAuth after testing)
router.post('/', async (req, res) => {
    try {
        console.log("test1 :",req.session.user_id)
    const { isbn, ...bookData } = req.body;

        // Make API call to retrieve book cover image URL
        const apiUrl = `https://api.bookcover.longitood.com/bookcover/${isbn}`;

        const apiResponse = await fetch(apiUrl);
        const { url: bookcoverURL } = await apiResponse.json();

        const newBook = await Book.create({
            ...bookData,
            owner_id: req.session.user_id,
            isbn: req.body.isbn,
            bookcoverURL: bookcoverURL,
        });


    res.status(200).json(newBook);
    } catch (err) {
        console.log(err)
    res.status(400).json(err);
    }
});

 // create an entry in Renter table to show renter id and book id
router.post('/checkedOut/:id', withAuth, async (req, res) => {
    try {
        const rentData = await Renter.create({ 
            book_id: req.params.id,
            renter_id: req.session.user_id,
        });

        // update the 'available' field in the book table
        await Book.update({ 
            available: false 
        }, 
        { 
            where: 
            { id: req.params.id } 
        });    

        res.status(200).json(rentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/return/:rentalId', async (req, res) => {
    try {
        console.log(req.params.rentalId);  // Debugging line

        // Fetch rental
        const rental = await Renter.findByPk(req.params.rentalId);
        console.log(rental);  // Debugging line

        if (!rental) {
            return res.status(404).json({ message: 'Rental not found' });
        }

        // Check if book exists
        const book = await Book.findByPk(rental.book_id);
        console.log(book);  // Debugging line

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // If the book and rental exist, we return the book
        await book.update({ available: true });
        await rental.destroy();
    
        return res.status(200).json({ message: 'Book returned successfully' });
    } catch (err) {
        console.log(err);  // Debugging line
        res.status(500).json({ message: 'Failed to return book' });
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const bookData = await Book.destroy({
            where: {
            id: req.params.id,
            owner_id: req.session.user_id,
            },
        });
    
        if (!bookData) {
            res.status(404).json({ message: 'No book found with this id!' });
            return;
        }
    
        res.status(200).json(bookData);
        } catch (err) {
        res.status(500).json(err);
        }
    });
    


module.exports = router;