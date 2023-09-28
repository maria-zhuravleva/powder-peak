import { Resort } from '../models/resort.js'
import { Profile } from '../models/profile.js'

function index(req, res) {
  Resort.find({})
  .then(resorts => {
    res.render('resorts/index', {
      resorts,
      title: "Powder Peak"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function newResort(req, res) {
  res.render("resorts/new", {
    title: "Add New Resort",
  })
}

function create(req, res) {
  req.body.creator = req.user.profile._id
  req.body.amenities = req.body.amenities.split(',').map(item => item.trim())

  Resort.create(req.body)
  .then(resort => {
    res.redirect('/resorts')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/resorts')
  })
}

function show(req, res) {
  Resort.findById(req.params.resortId)
  .populate([
    {path: "creator"},
    {path: "reviews.commenter"}
  ])
  .then(resort => {
    res.render('resorts/show', {
      resort,
      title: "Resort"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/resorts')
  })
}

function edit(req, res) {
  Resort.findById(req.params.resortId)
  .then(resort => {
    res.render("resorts/edit", {
      resort,
      title: "Edit Resort"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function update(req, res) {
  for (let key in req.body) {
    if(req.body[key] === "") delete req.body[key]
  }
  if (req.body.amenities) {
    req.body.amenities = req.body.amenities.split(', ')
  }
  Resort.findByIdAndUpdate(req.params.resortId, req.body, {new: true})
  .then(resort => {
    res.redirect(`/resorts/${resort._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect("/resorts")
  })
}

function deleteResort(req, res) {
  Resort.findByIdAndDelete(req.params.resortId)
  .then(resort => {
    res.redirect("/resorts")
  })
  .catch(err => {
    console.log(err)
    res.redirect("/resorts")
  })
}

function createReview(req, res) {
  Resort.findById(req.params.resortId)
  .then(resort => {
    req.body.commenter = req.user.profile._id
    resort.reviews.push(req.body)
    resort.save()
    .then(() => {
      res.redirect(`/resorts/${resort._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resorts')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/resorts')
  })
}

function deleteReview(req, res) {
  Resort.findById(req.params.resortId)
  .then(resort => {
    const review = resort.reviews.id(req.params.reviewId)
    if (review.commenter.equals(req.user.profile._id)) {
      resort.reviews.remove(review)
      resort.save()
      .then(() => {
        res.redirect(`/resorts/${resort._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/resorts')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/resorts')
  })
}

function editReview(req, res) {
  Resort.findById(req.params.resortId)
  .then(resort => {
    const review = resort.reviews.id(req.params.reviewId)
    if (review.commenter.equals(req.user.profile._id)) {
      res.render('resorts/editReview', {
        resort, 
        review,
        title: 'Update Review'
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/resorts')
  })
}

function updateReview(req, res) {
  Resort.findById(req.params.resortId)
  .then(resort => {
    const review = resort.reviews.id(req.params.reviewId)
    if (review.commenter.equals(req.user.profile._id)) {
      review.set(req.body)
      resort.save()
      .then(() => {
        res.redirect(`/resorts/${resort._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/resorts')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/resorts')
  })
}

function addFavoriteResort(req, res) {
  const userId = req.user.profile._id
  const resortId = req.params.resortId

  Profile.findById(userId)
    .then(profile => {
      if (!profile.favoriteResorts.includes(resortId)) {
        profile.favoriteResorts.push(resortId)

        profile.save()
          .then(() => {
            res.redirect(`/resorts/${resortId}`)
          })
          .catch(err => {
            console.log(err);
            res.redirect(`/resorts/${resortId}`)
          })
      } else {
        res.redirect(`/resorts/${resortId}`)
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/resorts')
    })
}

function deleteFavoriteResort(req, res){
  const userId = req.user.profile._id
  const favoriteResortId = req.params.favoriteResortId

  Profile.findById(userId)
    .then(profile => {
      if (profile.favoriteResorts.includes(favoriteResortId)) {
        profile.favoriteResorts = profile.favoriteResorts.filter(id => id.toString() !== favoriteResortId)
        profile.save()
          .then(() => {
            res.redirect(`/profiles/${userId}`)
          })
          .catch(err => {
            console.log(err)
            res.redirect('/profiles')
          })
      } else {
        throw new Error('Favorite resort not found or unauthorized')
      }
    })
    .catch(err => {
      console.log(err)
      res.redirect('/profiles')
    })
}

export {
  index,
  newResort as new,
  create,
  show,
  edit,
  update,
  deleteResort as delete,
  createReview,
  deleteReview,
  editReview,
  updateReview,
  addFavoriteResort,
  deleteFavoriteResort
}