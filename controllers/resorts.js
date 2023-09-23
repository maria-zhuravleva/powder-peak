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
  .populate("creator")
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

export {
  index,
  create,
  show,
  edit,
  update,
  deleteResort as delete,
  createReview
}