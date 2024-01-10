"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_connection_1 = require("./database/database-connection");
const dotenv_1 = __importDefault(require("dotenv"));
const emissions_1 = require("./routes/emissions");
dotenv_1.default.config();
(0, database_connection_1.connectDatabase)(process.env.MONGO_ADDRESS);
const app = (0, express_1.default)();
app.use('/emissions', emissions_1.router);
app.listen(process.env.READ_PORT, () => console.log('Service is running on port ' + process.env.READ_PORT + '!'));
//# sourceMappingURL=app.js.map