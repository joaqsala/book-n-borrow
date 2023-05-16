const { Renter } = require('../models');

const renterdata = [
  {
    book_id: 1,
    renter_id: 2
  },
  {
    book_id: 2,
    renter_id: 3
  },
];

const seedRenter = async () => 
await Renter.bulkCreate(renterdata, {
});


module.exports = {seedRenter};

