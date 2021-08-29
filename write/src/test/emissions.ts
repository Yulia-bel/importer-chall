import chai from 'chai'
import chaiHttp from 'chai-http'
let should = chai.should()

import { Emissions } from '../models/Emissions'
import { server } from '../app'


chai.use(chaiHttp)

describe('Emissions', () => {

	describe('/POST emissions', () => {
		it('it should save emissions.csv to database', (done) => {
			let emissions = '../data/emissions.csv'
			chai.request(server)
				.post('/emissions')
				.send({ file: emissions })
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		})
	})
})