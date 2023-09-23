import { Router } from 'express'
import * as resortsCtrl from '../controllers/resorts.js'

const router = Router()

router.get('/', resortsCtrl.index)

export {
  router
}