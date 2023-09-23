import { Router } from 'express'
import * as resortsCtrl from '../controllers/resorts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', resortsCtrl.index)
router.post('/', isLoggedIn, resortsCtrl.create)
router.get('/:resortId', resortsCtrl.show)

export {
  router
}