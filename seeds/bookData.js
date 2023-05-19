const { Book } = require('../models');

const bookdata = [
  {
    bookName: 'Do Hard Things: Why We Get Resilience Wrong and the Surprising Science of Real Toughness',
    author: 'Steve Magness',
    yearPublish: 2022,
    isbn: '978-0-06-309861-9',
    rentalPrice: 15.99,
    subject: 'psychology',
    course: 'social science',
    bookcoverURL: "blank",
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
    owner_id: 2,
  },
  {
    bookName: 'Glencoe Algebra 1, Common Core edition',
    author: "McGraw Hill",
    yearPublish: 2012,
    isbn: '978-0076639236',
    rentalPrice: 15.15,
    subject: 'math',
    course: 'algebra 1',
    bookcoverURL: "blank",
    owner_id: 2,
  },
];

const seedBook = async () => 
await Book.bulkCreate(bookdata, {
});


module.exports = {seedBook};
