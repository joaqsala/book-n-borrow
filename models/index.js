const User = require('./User');
const Book = require('./Book');
const Renter = require('./Renter');

// Ownership
User.hasMany(Book, {
  foreignKey: 'owner_id',
  as: 'ownedBooks',
  onDelete: 'CASCADE',
});

Book.belongsTo(User, {
  foreignKey: 'owner_id',
  as: 'owner',
  onDelete: 'CASCADE',
});

// Rental
User.hasMany(Renter, {
  foreignKey: 'renter_id',
  as: 'rentedBooks',
});

Renter.belongsTo(User, {
  foreignKey: 'renter_id',
  as: 'renter',
});

Book.hasOne(Renter, {
  foreignKey: 'book_id',
  as: 'renterInfo',
});

Renter.belongsTo(Book, {
  foreignKey: 'book_id',
  as: 'book',
  onDelete: 'CASCADE',
});

module.exports = { User, Book, Renter };
