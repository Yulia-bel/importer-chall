import express from 'express'
import mongoose from 'mongoose'

mongoose
	.connect(
		'mongodb://db:27017/docker-write',
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const app = express()



app.listen(3000, () => console.log('Write server running'))