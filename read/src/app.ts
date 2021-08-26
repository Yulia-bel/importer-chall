import express from 'express'
import mongoose from 'mongoose'

mongoose
  .connect(
    'mongodb://db:27017/docker-read',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express()

app.listen(4000, () => console.log('Read server running'))