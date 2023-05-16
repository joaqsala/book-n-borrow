const User = require('./User');
const Book = require('./Book');

//ownership
User.hasMany(Book, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    });

Book.belongsTo(User, {
    foreignKey: 'user_id',
    });

//rental
User.hasMany(Book, {
    through: Renter 
    });

Book.belongsTo(User, {
    through: Renter 
    });


module.exports = { User, Book };
