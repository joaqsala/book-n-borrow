const sequelize = require('../config/connection');
const { seedUser } = require('./userData');
const { seedBook } = require('./bookData');
const { seedRenter } = require('./renterData');



const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedBook();

  await seedRenter();

  process.exit(0);
}

seedAll();

