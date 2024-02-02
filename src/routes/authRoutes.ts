import { Router } from 'express'
import { loginUser, registerUser } from '../controllers/authController'
// import { validateHeaders } from '../middlewares/validateHeaders'

const router = Router()

router.post('/register',
  // validateHeaders,
  registerUser
)

router.post('/login',
  // validateHeaders,
  loginUser
)

export default router
