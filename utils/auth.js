const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.render('login');
  } else {
    next();
  }
};

module.exports = withAuth;
