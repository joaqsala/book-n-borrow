const router = require('express').Router();
const { User } = require('../../models');
const { Renter, Book } = require('../../models');

router.get('/:id/books', async (req, res) => {
  try {
    const rentedBooks = await Renter.findAll({
      where: {
        renter_id: req.params.id
      },
      include: [{
        model: Book,
        as: 'book'
      }]
    });

    res.status(200).json(rentedBooks);
  } catch (err) {
    res.status(500).json(err);
  }
});

//creates a new user profile
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_first_name = userData.firstName;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//checks whether a user is in the db, checks password, and then logs them in
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.user_first_name = userData.firstName;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
