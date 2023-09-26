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
  const loggedUserId = req.user ? req.user.id : null
  const authorizedUser = '650e2b53d428f18bfd988a96'

  // console.log('Logged User ID:', typeof loggedUserId) 
  // console.log('Authorized ID:', typeof authorizedUser)

    if (loggedUserId === authorizedUser) {
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
