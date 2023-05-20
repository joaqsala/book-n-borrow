const { Book } = require('../models');

const bookdata = [
  {
    bookName: 'Do Hard Things: Why We Get Resilience Wrong and the Surprising Science of Real Toughness',
    author: 'Steve Magness',
    yearPublish: 2022,
    isbn: '978-0-06-309861-9',
    rentalPrice: 15.99,
    subject: 'social science',
    course: 'psychology',
    bookcoverURL: "blank",
    available: false,
    owner_id: 1,
  },
  {
    bookName: 'Math with Bad Drawings: Illuminating the Ideas That Shape Our Reality',
    author: "Ben Orlin",
    yearPublish: 2018,
    isbn: '978-0-316-50903-9',
    rentalPrice: 3.14,
    subject: 'math',
    course: 'modern geometry',
    bookcoverURL: "blank",
    available: false,
    owner_id: 2,
  },
  {
    bookName: 'Glencoe Algebra 1, Student edition',
    author: "McGraw Hill",
    yearPublish: 2017,
    isbn: '978-0079039897',
    rentalPrice: 27.18,
    subject: 'math',
    course: 'algebra 1',
    bookcoverURL: "blank",
    available: true,
    owner_id: 2,
  },
  {
    bookName: 'Glencoe Algebra 1, Common Core edition',
    author: "McGraw Hill",
    yearPublish: 2012,
    isbn: '978-0076639236',
    rentalPrice: 1.62,
    subject: 'math',
    course: 'algebra 1',
    bookcoverURL: "blank",
    available: true,
    owner_id: 2,
  },
  {
    bookName: 'Introductory Chemistry',
    author: "Nivaldo Tro",
    yearPublish: 2017,
    isbn: '9780134555584',
    rentalPrice: 6.02,
    subject: 'science',
    course: 'chemistry',
    bookcoverURL: "blank",
    available: true,
    owner_id: 1,
  },
];

const seedBook = async () => 
await Book.bulkCreate(bookdata, {
});


module.exports = {seedBook};
