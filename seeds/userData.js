const { User } = require('../models');

const userdata = [
  {
    firstName: 'John',
    lastName: "Doe",
    email: 'john@something.mail',
    password: 'test1234',
  },
  {
    firstName: 'Frank',
    lastName: "Something",
    email: 'frank@something.mail',
    password: 'test1234',
  },
  {
    firstName: 'Joan',
    lastName: "Jett",
    email: 'heart@rock.mail',
    password: 'test1234',
  },
];

const seedUser = async () => 
await User.bulkCreate(userdata, {
  individualHooks: true,
  returning: true,
});


module.exports = {seedUser};
