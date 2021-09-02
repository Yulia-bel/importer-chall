import chai from 'chai'
import chaiHttp from 'chai-http'
let should = chai.should()

import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '../../env' })

chai.use(chaiHttp)

describe('Emissions', () => {

	describe('/POST emissions', () => {
		it('it should save emissions.csv to database', (done) => {

			let emissions = __dirname + '/../../data/emissions.csv'
			chai.request(process.env.URL + ':' + process.env.PORT)
				.post('/emissions')
				.attach('emissions', emissions)
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		})
	})
})