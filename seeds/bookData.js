const { Book } = require('../models');

const bookdata = [
  {
    bookName: 'Do Hard Things: Why We Get Resilience Wrong and the Surprising Science of Real Toughness',
    author: 'Steve Magness',
    yearPublish: 2022,
    isbn: "9780063098619",
    rentalPrice: 15.99,
    category: 'science',
    bookcoverURL: "blank",
    owner_id: 1,
  },
  {
    bookName: 'Math with Bad Drawings: Illuminating the Ideas That Shape Our Reality',
    author: "Ben Orlin",
    yearPublish: 2018,
    isbn: 978-0-316-50903-9,
    rentalPrice: 3.14,
    category: 'math',
    bookcoverURL: "blank",
    owner_id: 2,
  },
];

const seedBook = async () => 
await Book.bulkCreate(bookdata, {
});


module.exports = {seedBook};
