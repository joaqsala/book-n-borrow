const { Renter } = require('../models');

const renterdata = [

  {
    book_id: 5,
    renter_id: 2
  },
];

const seedRenter = async () => 
await Renter.bulkCreate(renterdata, {
});


module.exports = {seedRenter};

