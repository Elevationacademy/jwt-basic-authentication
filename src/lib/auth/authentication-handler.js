import jwt from 'jsonwebtoken'
import * as HttpStatus from 'http-status-codes'

require( 'dotenv' ).config()

class AuthenticationHandler {
    static fetchToken( request ) {
        const authorizationHeader = request.headers.authorization
        if ( !authorizationHeader ) {
            return null
        }

        if ( !authorizationHeader.startsWith( 'Bearer ' ) ) {
            return false
        }

        return authorizationHeader.slice( 7, authorizationHeader.length )
    }

    verifyToken( req, res, next ) {
        const token = AuthenticationHandler.fetchToken( req )

        if ( !token ) {
            return res.status( HttpStatus.UNAUTHORIZED ).json( {
                error: 'Please supply auth token'
            } )
        }

        req.token = token

        jwt.verify( req.token, process.env.JWT_SECRET, ( err, decoded ) => {
            if ( err ) {
                return res.status( HttpStatus.FORBIDDEN ).json( {
                    error: 'Token is invalid'
                } )
            }

            req.user = decoded
            next()
        } )
    }
}

export default new AuthenticationHandler
