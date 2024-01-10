import chai from 'chai'
import chaiHttp from 'chai-http'
let should = chai.should()

import dotenv from 'dotenv'

dotenv.config()

chai.use(chaiHttp)

describe('Emissions', () => {

	describe('/POST emissions', () => {
		it('it should save emissions.csv to database', (done) => {

			let emissions = __dirname + '/../../data/emissions.csv'

			chai.request(process.env.API_URL + ':' + process.env.PORT)
				.post('/emissions')
				.attach('emissions', emissions)
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		})
	})

	describe('/GET emissions', () => {
		it('it should get emission docs', (done) => {
			chai.request(process.env.API_URL + ':' + process.env.PORT)
				.get('/emissions?country=ABW&sector=Other&year=1850')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(2)
					done()
				})
		})
	})
})