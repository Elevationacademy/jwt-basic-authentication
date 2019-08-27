import express from 'express'
import fileRestController from '../controllers/file.restcontroller'
import * as Multer from 'multer'

const multer = Multer( {
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024
    }
} )

const router = express.Router()

router.post( '/upload', multer.single( 'myFile' ), fileRestController.uploadFile.bind( fileRestController ) )

export default router
