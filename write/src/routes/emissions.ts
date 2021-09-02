import { Request, Response, Router } from 'express'
import fs from 'fs'
import * as csv from 'fast-csv';
import multer from 'multer'
import { Emissions } from '../models/Emissions'
import rowMapper from '../helpers/rowMap'

const upload = multer({ dest: 'uploads/' })
const router = Router()


router.post('/', upload.single('emissions'), async (req: Request, res: Response) => {

	await Emissions.deleteMany({})

	try {
		const csvFile: any = req.file

		let stream = fs.createReadStream(csvFile.path)

		let csvStream = csv.parse({ skipLines: 1 })
			.on("data", function (data) {

				try {

					const row = rowMapper(data)

					Emissions.insertMany(row)

				} catch (err) {
					console.error(err)
				}
			})
			.on("end", function () {
				res.json({ successMessage: 'File saved' })
			})

		stream.pipe(csvStream)

	}
	catch (error) {
		res.json({ errorMessage: error })
	}
})


export { router }