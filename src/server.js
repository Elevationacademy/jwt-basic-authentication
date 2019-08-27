import 'dotenv/config'
import express from 'express'
import routes from './routes/index'
import cors from 'cors'
import bodyParser from 'body-parser'
import admin from 'firebase-admin'
import authenticationHandler from './lib/auth/authentication-handler'
import sequelize from './lib/database/sequelize-connection'

( async () => {
    const app = express()
    const PORT = process.env.SERVER_PORT
    let connection = true

    try {
        await sequelize.authenticate()

        admin.initializeApp( {
            credential: admin.credential.cert( './gcloud-credentials.json' ),
            storageBucket: process.env.GCLOUD_STORAGE_BUCKET
        } )

        app.use( cors() )

        app.use( bodyParser.json() )
        app.use( bodyParser.urlencoded( { extended: false } ) )

        app.get( '/health', ( req, res ) => res.json( { UP: connection } ) )
        app.use( '/api/file', authenticationHandler.verifyToken, routes.fileRoutes )
        app.use( '/api/user', routes.userRoutes )
    } catch ( e ) {
        connection = false

        app.use( ( req, res ) => {
            res.status( 500 )
            res.json( { error: 'Server is unavailable at the moment' } )
        } )
    }

    app.listen( PORT, () => console.log( `Server is listening on port ${ PORT }` ) )
} )()
