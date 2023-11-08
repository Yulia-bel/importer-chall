import { Router, Response, Request } from 'express'

import { Emissions } from '../models/Emissions'

const router = Router()



router.get('/read', async (req: Request, res: Response) => {

	try {

		const filters: { country?: string, sector?: string, parentSector?: string, year?: any } = {}

		if (typeof req.query.country === 'string') {
			filters.country = req.query.country
		}

		if (typeof req.query.sector === 'string') {
			filters.sector = req.query.sector
		}

		if (typeof req.query.parentSector === 'string') {
			filters.parentSector = req.query.parentSector
		}

		if (typeof req.query.year === 'string') {
			filters.year = req.query.year
		}

		if (Array.isArray(req.query.year)) {
			filters.year = { $in: req.query.year }
		}

		const emissions = await Emissions.find(filters)

		console.log(filters)

		res.json(emissions)


	} catch (error) {
		res.json({ errorMessage: error })
	}

})



export { router }