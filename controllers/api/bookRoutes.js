const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');


 // Get books using the field name (chosen by user in dropdown) and value 
router.get('/', async (req, res) => {
    try {
        const { fieldName, newInfo } = req.body;

        const bookData = await Book.findAll({
        [fieldName] : newInfo
    });
        if (!bookData) {
        res.status(404).json({ message: 'There are no books for the given search parameters.' });
        return;
        }
    
        res.status(200).json(bookData);

    } catch (err) {
    res.status(500).json(err);
    }
});



// router.delete('/:id', withAuth, async (req, res) => {
//     try {
//         const bookData = await Book.destroy({
//         where: {
//             id: req.params.id,
//             user_id: req.session.user_id,
//         },
//         });

//         if (!bookData) {
//         res.status(404).json({ message: 'No book found with this id!' });
//         return;
//         }
//         res.status(200).json(bookData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

module.exports = router;