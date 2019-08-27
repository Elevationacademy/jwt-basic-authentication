require( 'dotenv' ).config()
import * as HttpStatus from 'http-status-codes'
import * as jwt from 'jsonwebtoken'
import models from '../models'
import md5 from 'md5'

class UserRestController {
    static EXPIRATION_TIME = '24h'

    async login( req, res ) {
        const { username, password } = req.body

        if ( !username || !password ) {
            return res.status( HttpStatus.BAD_REQUEST ).json( { error: 'Missing username or password' } )
        }

        const user = await models.User.findOne( {
            where: {
                username: username,
                password: md5( password )
            }
        } )

        if ( user === null ) {
            return res.status( HttpStatus.UNAUTHORIZED ).json( { error: 'Incorrect username or password' } )
        }

        const token = jwt.sign( { user_id: user.user_id, username: username }, process.env.JWT_SECRET, {
            expiresIn: UserRestController.EXPIRATION_TIME
        } )

        res.json( { token } )
    }

    async signup( req, res ) {
        try {
            const user = await models.User.create( req.body )
            res.status( HttpStatus.CREATED ).json( user )
        } catch ( e ) {
            res.status( HttpStatus.UNPROCESSABLE_ENTITY ).send( e )
        }
    }

    fetchUserDetails( req, res ) {
        res.json( req.user )
    }
}

export default new UserRestController()
