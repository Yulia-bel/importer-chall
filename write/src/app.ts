import express from 'express'
import { connectDatabase } from './database/database-connection'
import dotenv from 'dotenv'
import { router as emissionRoute } from './routes/emissions'

dotenv.config()

connectDatabase(process.env.MONGO_ADDRESS);

const app = express()

app.use('/emissions', emissionRoute)


const server = app.listen(process.env.PORT, () => console.log('Write is running'))

export { server }