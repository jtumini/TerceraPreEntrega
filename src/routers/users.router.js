import { Router } from 'express'
import { get, create } from '../controllers/users.controller'

const router = Router()

router.get('/', get)
router.post('/', create)

export default router