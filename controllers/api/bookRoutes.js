const router = require('express').Router();
const { Book } = require('../../models');
const withAuth = require('../../utils/auth');




// router.put('/:id', async (req, res) => {
//     // update a book by its `id` value
//     try {
//     const bookData = await Book.update(req.body, {
//         where: {
//         id: req.params.id,
//         },
//     });

//     if (!bookData) {
//     res.status(404).json({ message: 'No book found with this id.' });
//     return;
//     }

//     res.status(200).json(bookData);
//     } catch (err) {
//     res.status(500).json(err);
//     }
// });

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