import express from 'express'

import { Emissions } from '../models/Emissions'

const router = express.Router()



router.get('/', async (req, res) => {

	try {
		if (req.query.search) {
			let search = req.query.search.toString()
			let emissions = await Emissions.find({ $text: { $search: search } })
			res.json(emissions)
		} else {
			let filters: { country?: any, sector?: any, parentSector?: any } = {}

			req.query.country ? filters.country = req.query.country : filters = filters
			req.query.sector ? filters.sector = req.query.sector : filters = filters
			req.query.parentSector ? filters.parentSector = req.query.parentSector : filters = filters


			let emissions = await Emissions.find(filters)
			res.json(emissions)
		}

	} catch (error) {
		res.json({ errorMessage: error })
	}

})

export { router }