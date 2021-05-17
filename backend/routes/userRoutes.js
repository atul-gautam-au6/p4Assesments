import express from 'express'
import { AuthUser, UserSignUp } from '../controller/userController'
const router =express.Router()


router.route('/signup').post(UserSignUp)
router.route('/signin').post(AuthUser)

export default router