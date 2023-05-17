const router = require('express').Router();
const { User, Book } = require('../models');
const withAuth = require('../utils/auth');
//withAuth is only used in the front end not the backend api routes

router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      attributes: ['bookName', 'author', 'isbn', 'bookcoverURL'],
      order: [['bookName', 'ASC']],
    });

    const books = bookData.map((book) => book.get({ plain: true }));
    console.log(books);
    res.render('/homepage', {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: { exclude: ['owner_id'] },
    });

    const book = bookData.get({ plain: true });
    console.log(book)

    res.render('onebook', {
      ...book,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile/:id', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: [
        {
          model: Book, 
          attributes: { exclude: ['owner_id'] },
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
