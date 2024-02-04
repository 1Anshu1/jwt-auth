import express from 'express'
import { signup, signin, userinfo } from '../controller/auth.controller.js';


const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/userinfo', userinfo)


export default router;