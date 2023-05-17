const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
//withAuth is only used in the front end not the backend api routes

// router.get('/', (req, res) => {
//   console.log(req.session)
//   console.log(req.session.logged_in)

//   // setTimeout(1000)
//   res.render('login');
// });

router.get('/', withAuth, async (req, res) => {
  if (req.session.logged_in) {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['password'] },
        order: [['name', 'ASC']],
      });

      const users = userData.map((project) => project.get({ plain: true }));

      res.render('homepage', {
        users,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } 
  res.render("login")
});

// insert get route for login here:
router.get('/login', (req,res) => {
  res.render('login')
})

module.exports = router;
