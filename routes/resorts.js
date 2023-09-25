import { Router } from 'express'
import * as resortsCtrl from '../controllers/resorts.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', resortsCtrl.index)
router.get('/new', isLoggedIn, resortsCtrl.new)
router.get('/:resortId', isLoggedIn, resortsCtrl.show)
router.get("/:resortId/edit", isLoggedIn, resortsCtrl.edit)
router.get('/:resortId/reviews/:reviewId/edit', isLoggedIn, resortsCtrl.editReview)
router.post('/', isLoggedIn, resortsCtrl.create)
router.post('/:resortId/reviews', isLoggedIn, resortsCtrl.createReview)
router.post('/:resortId/favoriteResorts', isLoggedIn, resortsCtrl.addFavoriteResort)
router.put("/:resortId", isLoggedIn, resortsCtrl.update)
router.put('/:resortId/reviews/:reviewId', isLoggedIn, resortsCtrl.updateReview)
router.delete("/:resortId", isLoggedIn, resortsCtrl.delete)
router.delete('/:resortId/reviews/:reviewId', isLoggedIn, resortsCtrl.deleteReview)
router.delete('/:resortId/favoriteResorts/:favoriteResortId', isLoggedIn, resortsCtrl.deleteFavoriteResort)

export {
  router
}