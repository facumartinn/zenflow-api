import { Router } from 'express';
import { loginUser } from '../controllers/authController.js';
// import { validateHeaders } from '../middlewares/validateHeaders'
var router = Router();
// router.post('/register',
//   // validateHeaders,
//   registerUser
// )
router.post('/login', 
// validateHeaders,
loginUser);
export default router;
