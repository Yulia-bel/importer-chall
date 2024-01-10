"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDatabase(mongo_address) {
    try {
        await mongoose_1.default.connect(mongo_address);
        console.log('MongoDB Connected');
    }
    catch (error) {
        console.log(error);
    }
}
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database-connection.js.map