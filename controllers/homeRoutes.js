const router = require('express').Router();
const { User, Book } = require('../models');
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

  router.get('/book/:id/checkout', async (req, res) => {
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

  // book user has chosen to rent 
// router.get('/rent/:id', async (req, res) => {
//   try {
//     const bookData = await Book.findByPk(req.params.id, {
//       where: {
//         available: true,
//       },
//       attributes: { exclude: ['owner_id'] },
//     });

//     const book = bookData.get({ plain: true });

//     res.render('checkout', {
//       book,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//route once user is logged in to see what they're renting & have on rent
// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [ 
//         { 
//           model: Book, 
//           attributes: { exclude: ['owner_id'] }
//         },
//       ]
//     });
//     const renterData = await User.findByPk(req.session.user_id, {
//       attributes: [
//         {
//           model: Renter, 
//           attributes: ['book_id'],
//         },
//       ],
//     });

//     const user = userData.get({ plain: true });
//     console.log(user)
//     const renter = renterData.get({ plain: true });
//     console.log(renter)

//     res.render('profile', {
//       ...user,
//       ...renter,
//       logged_in: req.session.logged_in,
//       user_first_name: req.session.user_first_name,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
  res.render('profile', {
      logged_in: req.session.logged_in,
      user_first_name: req.session.user_first_name,
  });
  } catch (err) {
  res.status(500).json(err);
  }
});

module.exports = router;
