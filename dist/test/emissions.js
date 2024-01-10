"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
let should = chai_1.default.should();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
chai_1.default.use(chai_http_1.default);
describe('Emissions', () => {
    describe('/POST emissions', () => {
        it('it should save emissions.csv to database', (done) => {
            let emissions = __dirname + '/../../data/emissions.csv';
            chai_1.default.request(process.env.API_URL + ':' + process.env.PORT)
                .post('/emissions')
                .attach('emissions', emissions)
                .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
    describe('/GET emissions', () => {
        it('it should get emission docs', (done) => {
            chai_1.default.request(process.env.API_URL + ':' + process.env.PORT)
                .get('/emissions?country=ABW&sector=Other&year=1850')
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(2);
                done();
            });
        });
    });
});
//# sourceMappingURL=emissions.js.map