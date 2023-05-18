// //route once user is logged in to see what they're renting & have on rent
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [ 
//         { 
//           model: Book, 
//           attributes: { exclude: ['owner_id'] }
//         },
//       ]
//     });
//     const renterData = await User.findByPk(req.session.user_id, {
//       attributes: [
//         {
//           model: Renter, 
//           attributes: ['book_id'],
//         },
//       ],
//     });

//     const user = userData.get({ plain: true });
//     console.log(user)
//     const renter = renterData.get({ plain: true });
//     console.log(renter)

//     res.render('profile', {
//       ...user,
//       ...renter,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


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