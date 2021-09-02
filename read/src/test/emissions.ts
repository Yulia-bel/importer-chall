import chai from 'chai'
import chaiHttp from 'chai-http'
let should = chai.should()

import dotenv from 'dotenv'

dotenv.config({ path: __dirname + '../../env' })

chai.use(chaiHttp)

describe('Emissions', () => {

	describe('/GET emissions', () => {
		it('it should get emission docs', (done) => {

			chai.request(process.env.URL + ':' + process.env.PORT)
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


