const router = require('express').Router();
const { User, Renter, Book } = require('../models');
const withAuth = require('../utils/auth');


 // Get all books
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      where: {
        available: true,
      },
      attributes: ['bookName', 'author', 'isbn', 'bookcoverURL', 'yearPublish', 'rentalPrice','id'],
      order: [['bookName', 'ASC']],
      
    });
    

    // Serialize data so the template can read it
    const books = bookData.map((book) => book.get({ plain: true }));
    console.log(books);
    // Pass serialized data and session flag into template
    res.render('homepage', {
      books,
      logged_in: req.session.logged_in,
      user_first_name: req.session.user_first_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get a book from the homescreen to display on a card
router.get('/book/:id', async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      attributes: ['bookName', 'author', 'isbn', 'bookcoverURL', 'yearPublish', 'rentalPrice','id'],
    });

    const book = bookData.get({ plain: true });
    console.log(book) // check if 'id' is logged here

    
    res.render('viewbookpage', {
      book, // the 'id' should be passed along with the rest of the book data here
      logged_in: req.session.logged_in,
      user_first_name: req.session.user_first_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Send user to posting page
router.get('/loaner', async (req, res) => {
  try {
  res.render('newlisting', {
      logged_in: req.session.logged_in,
      user_first_name: req.session.user_first_name,
  });
  } catch (err) {
  res.status(500).json(err);
  }
});

//Send user to search page
router.get('/search', async (req, res) => {
  try {
  res.render('search', {
      logged_in: req.session.logged_in,
      user_first_name: req.session.user_first_name,
  });
  } catch (err) {
  res.status(500).json(err);
  }
});

// Sign-up route
router.get('/signup', (req, res) => {
  try {
    res.render('signup');
    
  } catch (err) {
    res.status(500).json(err);
  }
  });

  //page for user to see what book they'll be checking out
  router.get('/book/:id/checkout', withAuth, async (req, res) => {
    try {
      // Retrieve the book data from the database
      const bookData = await Book.findByPk(req.params.id, {
        attributes: { exclude: ['owner_id'] },
      });
  
      if (!bookData) {
        res.status(404).json({ message: 'No book found with this id!' });
        return;
      }
  
      const book = bookData.get({ plain: true });
      console.log(book);
  
      // Pass the book data to the checkout template
      res.render('checkout', {
        book,
        logged_in: req.session.logged_in,
        user_first_name: req.session.user_first_name,
      });
    } catch (err) {
      res.status(500).json(err);
    }
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


router.get('/profile', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: { id: req.session.user_id }, 
      include: [
        {
          model: Renter,
          as: 'rentedBooks',
          include: [
            {
              model: Book,
              as: 'book',
              attributes: ['id','bookName', 'isbn', 'rentalPrice'] // add the fields that you want to display
            },
          ],
        },
        {
          model: Book,
          as: 'ownedBooks',
          where: { owner_id: req.session.user_id },
          attributes: ['id','bookName', 'isbn', 'rentalPrice'], // add the fields that you want to display
          required: false
        },
      ]
    });

    const user = userData.get({ plain: true });
    
    // Log the user data to check if it includes the book details
    console.log(user);

    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
      user_first_name: req.session.user_first_name,
      user_last_name: req.session.user_last_name,
      email: user.email
    });
  } catch (err) {
    res.status(500).json(err);
  }
});







module.exports = router;
