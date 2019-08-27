import 'dotenv/config'
import express from 'express'
import userRoutes from './routes/user.route'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.SERVER_PORT

app.use( cors() )

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: false } ) )

app.use( '/api/user', userRoutes )

app.listen( PORT, () => console.log( `Server is listening on port ${ PORT }` ) )
