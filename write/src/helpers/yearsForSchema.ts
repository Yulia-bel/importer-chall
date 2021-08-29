function generateYearsForSchema() {
	let yearsForSchema = {}

	for (let i = 1850; i < 2015; i++) {
		Object.assign(yearsForSchema, { [i]: { type: 'Number' } })
	}

	return yearsForSchema
}

console.log(generateYearsForSchema())