import express from 'express'
import { connectDatabase } from './database/database-connection'
import dotenv from 'dotenv'
import { router as emissionRoute } from './routes/emissions'

dotenv.config()

connectDatabase(process.env.MONGO_ADDRESS);

const app = express()

app.use('/emissions', emissionRoute)

app.listen(process.env.READ_PORT, () => console.log('Service is running on port ' + process.env.READ_PORT + '!'))



