import { Resort } from '../models/resort.js'

function index(req, res) {
  Resort.find({})
  .then(resorts => {
    res.render('resorts/index', {
      resorts,
      title: "🗻"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/")
  })
}

function create(req, res) {
  req.body.creator = req.user.profile._id
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
      title: "🗻 show"
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
  Resort.findById(req.params.resortId)
  .then(resort => {
    req.body.owner = req.user.profile._id
    resort.favoriteResorts.push(req.body)
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

function deleteFavoriteResort(req, res){
  Resort.findById(req.params.resortId)
  .then(resort => {
    const favoriteResort = resort.favoriteResorts.id(req.params.favoriteResortId)
    if (favoriteResort.owner.equals(req.user.profile._id)) {
      resort.favoriteResorts.remove(favoriteResort)
      resort.save()
      .then(() => {
        res.redirect(`/profiles/${profile._id}`)
      })
      .catch(err => {
        console.log(err)
        res.redirect('/profiles')
      })
    } else {
      throw new Error('🚫 Not authorized 🚫')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/profiles')
  })
}

export {
  index,
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