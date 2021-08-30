import chai from 'chai'
import chaiHttp from 'chai-http'
let should = chai.should()

import dotenv from 'dotenv'

dotenv.config()

chai.use(chaiHttp)

describe('Emissions', () => {

	describe('/GET emissions', () => {
		it('it should get emission docs', (done) => {

			chai.request('http://localhost:4000')
				.get('/emissions?country=ABW&parentSector=Energy')
				.end((err, res) => {
					res.should.have.status(200)
					res.body.should.be.a('array')
					res.body.length.should.be.eql(4)
					done()
				})
		})
	})
})


