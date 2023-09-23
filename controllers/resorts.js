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

export {
  index,
  create
}