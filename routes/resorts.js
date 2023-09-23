import { Router } from 'express'
import * as resortsCtrl from '../controllers/resorts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', resortsCtrl.index)
router.get('/:resortId', isLoggedIn, resortsCtrl.show)
router.get("/:resortId/edit", isLoggedIn, resortsCtrl.edit)
router.post('/', isLoggedIn, resortsCtrl.create)
router.post('/:resortId/reviews', isLoggedIn, resortsCtrl.createReview)
router.put("/:resortId", isLoggedIn, resortsCtrl.update)
router.delete("/:resortId", isLoggedIn, resortsCtrl.delete)
router.delete('/:resortId/reviews/:reviewId', isLoggedIn, resortsCtrl.deleteReview)

export {
  router
}