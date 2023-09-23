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

export {
  index
}