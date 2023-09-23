import { Router } from 'express'
import * as resortsCtrl from '../controllers/resorts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', resortsCtrl.index)
router.get('/:resortId', resortsCtrl.show)
router.get("/:resortId/edit", resortsCtrl.edit)
router.post('/', isLoggedIn, resortsCtrl.create)

export {
  router
}