import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
import { validateHeaders } from '../middlewares/validateHeaders.js';
const router = Router();
router.post('/register', validateHeaders, registerUser);
router.post('/login', validateHeaders, loginUser);
export default router;
