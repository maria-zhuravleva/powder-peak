import { Resort } from '../models/resort.js'
import { FavoriteResort } from '../models/favoriteResort.js'



// function show(req, res) {
//   FavoriteResort.findById(req.params.id)
//   .populate("owner")
//   .then(favoriteResort => {
//     console.log("favoriteResort:", favoriteResort)
//     Resort.find({})
//     .then(resorts => {
//       console.log("resorts:", resorts)
//       res.render('resorts/show', {
//         favoriteResort,
//         resorts,
//         title: "show favorite resorts 🗻"
//       })
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/resorts')
//   })
// }


// function addFavoriteResort(req, res) {
//   const favoriteResortId = req.params.favoriteResortId
//   const resortId = req.params.resortId

//   FavoriteResort.findById(favoriteResortId)
//     .then(favoriteResort => {
//       if (!favoriteResort) {
//         throw new Error('Favorite Resort not found')
//       }

//       favoriteResort.resort.push(resortId)

//       return favoriteResort.save()
//     })
//     .then(() => {
//       res.redirect(`/favoriteResorts/${favoriteResortId}`)
//     })
//     .catch(err => {
//       console.log(err);
//       res.redirect('/favoriteResorts')
//     });
// }


// function addFavoriteResort(req, res) {
//   FavoriteResort.findById(req.params.favoriteResortId)
//   .then(favoriteResort => {
//     favoriteResort.resorts.push(req.params.resortId)
//     favoriteResort.save()
//     .then(() => {
//       res.redirect(`/favoriteResorts/${favoriteResort._id}`)
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/favoriteResorts')
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/favoriteResorts')
//   })
// }


// function saveFavoriteResort(req, res) {
//   const userId = req.user.profile._id;
//   const resortId = req.body.resortId;

//   const favoriteResort = new FavoriteResort({
//     owner: userId,
//     resort: resortId
//   });

//   favoriteResort.save()
//     .then(() => {
//       res.json({ success: true, message: 'Favorite resort saved successfully.' });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({ success: false, message: 'Error saving favorite resort.' });
//     });
// }

export {
  // show,
  // addFavoriteResort
}