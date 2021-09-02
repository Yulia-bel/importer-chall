import mongoose from 'mongoose'

export const EmissionsSchema = new mongoose.Schema({
	country: {
		type: String,
		required: true
	},
	sector: {
		type: String,
		required: true
	},
	parentSector: {
		type: String
	},
	year: {
		type: String
	},
	value: {
		type: Number
	}
})

EmissionsSchema.index({ country: 1, sector: 1, year: 1 })

export const Emissions = mongoose.model('Emissions', EmissionsSchema)