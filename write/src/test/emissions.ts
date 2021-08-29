import chai from 'chai'
import chaiHttp from 'chai-http'
let should = chai.should()



chai.use(chaiHttp)

describe('Emissions', () => {

	describe('/POST emissions', () => {
		it('it should save emissions.csv to database', (done) => {
			let emissions = __dirname + '/../../data/emissions.csv'
			chai.request('http://localhost:3000')
				.post('/emissions')
				.attach('emissions', emissions)
				.end((err, res) => {
					res.should.have.status(200);
					done()
				})
		})
	})
})