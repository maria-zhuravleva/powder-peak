import { Router } from 'express'
import * as resortsCtrl from '../controllers/resorts.js'
import { isLoggedIn } from '../middleware/middleware.js'
import { isAuthorized } from '../middleware/middleware.js'

const router = Router()

router.get('/', resortsCtrl.index)
router.get('/new', isAuthorized, resortsCtrl.new)
router.get('/:resortId', isLoggedIn, resortsCtrl.show)
router.get("/:resortId/edit", isAuthorized, resortsCtrl.edit)
router.get('/:resortId/reviews/:reviewId/edit', isLoggedIn, resortsCtrl.editReview)
router.post('/', isAuthorized, resortsCtrl.create)
router.post('/:resortId/reviews', isLoggedIn, resortsCtrl.createReview)
router.post('/:resortId/favoriteResorts', isLoggedIn, resortsCtrl.addFavoriteResort)
router.put("/:resortId", isAuthorized, resortsCtrl.update)
router.put('/:resortId/reviews/:reviewId', isLoggedIn, isAuthorized, resortsCtrl.updateReview)
router.delete("/:resortId", isAuthorized, resortsCtrl.delete)
router.delete('/:resortId/reviews/:reviewId', isLoggedIn, isAuthorized, resortsCtrl.deleteReview)
router.delete('/:resortId/favoriteResorts/:favoriteResortId', isLoggedIn, resortsCtrl.deleteFavoriteResort)

export {
  router
}