import express from 'express'
import userRestController from '../controllers/user.restcontroller'
import authenticationHandler from '../lib/auth/authentication-handler'

const router = express.Router()

router.post( '/login', userRestController.login.bind( userRestController ) )
router.post( '/signup', userRestController.signup.bind( userRestController ) )
router.get( '/me', authenticationHandler.verifyToken, userRestController.fetchUserDetails.bind( userRestController ) )

export default router
