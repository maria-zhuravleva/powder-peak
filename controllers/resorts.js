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

export {
  index,
  create,
  show,
  edit
}