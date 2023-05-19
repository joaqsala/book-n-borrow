const router = require('express').Router();
const { User, Book, Renter } = require('../models');
const withAuth = require('../utils/auth');


 // Get all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['bookName', 'author', 'isbn', 'bookcoverURL'],
      order: [['bookName', 'ASC']],
    });

    // Serialize data so the template can read it
    const books = bookData.map((book) => book.get({ plain: true }));
    console.log(books);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a book from the homescreen to display on a card
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: { exclude: ['owner_id'] },
    });

    const book = bookData.get({ plain: true });
    console.log(book)

    res.render('onebook', {
      book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Send user to posting page
router.get('/loaner', async (req, res) => {
  try {
  res.render('newlisting', {
      logged_in: req.session.logged_in
  });
  } catch (err) {
  res.status(500).json(err);
  }
});

//Send user to search page
router.get('/search', async (req, res) => {
  try {
  res.render('search', {
      logged_in: req.session.logged_in
  });
  } catch (err) {
  res.status(500).json(err);
  }
});

// Sign-up route
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('signup');
  });

// Login route
router.get('/login', (req, res) => {
// If the user is already logged in, redirect to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
