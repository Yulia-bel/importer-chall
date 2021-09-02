import headersArray from './headersArray'

const rowMapper = function (dataArray: (string | number)[]) {

	const [country, sector, parentSector, ...yearsData] = dataArray

	const row = yearsData.map((yearValue: (string | number), index: number) => {
		const emission = {
			country: country,
			sector: sector,
			parentSector: parentSector,
			year: headersArray[index + 3],
			value: yearValue
		}
		return emission
	})

	return row
}

export default rowMapper