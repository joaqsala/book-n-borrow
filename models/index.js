const User = require('./User');
const Book = require('./Book');
const Renter = require('./Renter');

//ownership
User.hasMany(Book, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    });

Book.belongsTo(User, {
    foreignKey: 'user_id',
    });

//rental
User.belongsToMany(Book, {
    through: Renter, 
    foreignKey: 'renter_id',
    });

Book.belongsTo(User, {
    through: Renter,
    foreignKey: 'book_id',
    });


module.exports = { User, Book, Renter }