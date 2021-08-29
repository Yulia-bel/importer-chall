import express from 'express'
import fs from 'fs'
import fastcsv from 'fast-csv'


const router = express.Router()


router.post('/', (req, res) => {

	// const csvFile = req.body.file

	// let stream = fs.createReadStream(csvFile)

	res.send('saved')




})

export { router }