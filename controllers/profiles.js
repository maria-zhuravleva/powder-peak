import { Profile } from '../models/profile.js'
import { Resort } from '../models/resort.js'


function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('profiles/index', {
      profiles,
			title: "Profile"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res) {
  Profile.findById(req.params.profileId)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    res.render("profiles/show", {
      title: `🗻 ${profile.name}'s profile`,
      profile,
      isSelf,
    })
  })
  .catch((err) => {
    console.log(err)
    res.redirect("/profiles")
  })
}

// can see all reviews left for resort in current profile
function renderReviews(req, res){
  const profileId = req.user.profile._id

  Resort.find({ 'reviews.commenter': profileId })
    .then(resorts => {
      Profile.findById(profileId)
        .then(profile => {
          res.render('profiles/reviews', {
            profile,
            profileId, 
            resorts,
            title: 'See All Reviews'
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/profiles')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
}

// old
// function renderReviews(req, res){
//   const profileId = req.user.profile._id

//   console.log(profileId)
//   Resort.find({ creator: profileId })
//     .then(resorts => {
//       Profile.findById(profileId)
//         .then(profile => {
//           res.render('profiles/reviews', {
//             profile,
//             profileId, 
//             resorts,
//             title: 'See All Reviews'
//           })
//         })
//         .catch(err => {
//           console.log(err)
//           res.redirect('/profiles')
//         })
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/profiles')
//     })
// }

function renderFavoriteResorts(req, res){
  const profileId = req.params.profileId

  Resort.find({ creator: profileId })
    .then(resorts => {
      Profile.findById(profileId)
        .then(profile => {
          res.render('profiles/favoriteResorts', {
            profile,
            profileId, 
            resorts,
            title: 'See Favorite Resorts'
          })
        })
        .catch(err => {
          console.log(err)
          res.redirect('/profiles')
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    });
}




export {
  index,
  show,
  renderReviews,
  renderFavoriteResorts,
}