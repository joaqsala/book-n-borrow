const router = require('express').Router();
const { Book } = require('../../models');
const exphbs = require('express-handlebars');
const helpers = require('../../utils/helpers');
const { Op } = require('sequelize');
const hbs = exphbs.create({ helpers });

router.post('/', async (req, res) => {
  try {
    const filter = req.body.filter;
    const query = req.body.query;

    if (!['isbn', 'subject', 'bookName', 'course'].includes(filter)) {
      res.status(400).json({ message: 'Invalid filter.' });
      return;
    }

    let searchObject = {
      available: true,
    };

    if (filter === 'bookName') {
      searchObject[filter] = {
        [Op.like]: `%${query}%`,
      };
    } else {
      searchObject[filter] = query;
    }

    const bookData = await Book.findAll({
      where: searchObject,
      raw: true,
    });

    if (!bookData) {
      res
        .status(404)
        .json({ message: 'No books found with the given parameters.' });
      return;
    }

    const books = Array.isArray(bookData) ? bookData : [bookData];
    hbs
      .render('views/partials/cards/listingCard.handlebars', { books })
      .then((renderedHtml) => {
        res.send(renderedHtml);
      });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
