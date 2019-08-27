import admin from 'firebase-admin'
import * as uniqid from 'uniqid'
import path from 'path'
import * as HttpStatus from 'http-status-codes'

require( 'dotenv' ).config()

class FileRestController {
    static signedUrlConfig = {
        action: 'read',
        expires: '03-09-2491'
    }

    async uploadFile( request, response ) {
        if ( !request.file ) {
            response.status( HttpStatus.UNPROCESSABLE_ENTITY )
            response.json( { error: 'Please supply a file' } )
            return
        }

        if ( request.file.mimetype !== 'image/jpeg' ) {
            response.sendStatus( HttpStatus.UNSUPPORTED_MEDIA_TYPE )
        }

        const fileExtension = path.extname( request.file.originalname )
        const fileName = request.file.originalname.split( fileExtension )[ 0 ]
        const uniqueFileName = fileName + '-' + uniqid() + fileExtension

        const bucket = admin.storage().bucket()
        const blob = bucket.file( uniqueFileName )
        const buffer = Buffer.from( request.file.buffer )

        try {
            await blob.save( buffer )

            const signedUrls = await blob.getSignedUrl( FileRestController.signedUrlConfig )

            response.status( HttpStatus.CREATED )
            response.json( { url: signedUrls[0] } )
        } catch ( error ) {
            response.status( HttpStatus.INTERNAL_SERVER_ERROR )
            console.error( error )
            response.json( { error: error } )
        }
    }
}

export default new FileRestController()
