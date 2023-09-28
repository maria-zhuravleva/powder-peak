import { Resort } from '../models/resort.js'
import { User } from '../models/user.js'

function passDataToView(req, res, next) {
  res.locals.user = req.user ? req.user : null
  res.locals.googleClientID = process.env.GOOGLE_CLIENT_ID
  next()
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/')
}


function isAuthorized(req, res, next) {
  if (req.user.profile.admin) {
    return next()
  } else {
    res.redirect('/')
  }
}



export {
  passDataToView,
  isLoggedIn,
  isAuthorized
}
