"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emissions = exports.EmissionsSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.EmissionsSchema = new mongoose_1.default.Schema({
    country: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    parentSector: {
        type: String
    },
    year: {
        type: String
    },
    value: {
        type: Number
    }
});
exports.EmissionsSchema.index({ country: 1, sector: 1, year: 1 });
exports.Emissions = mongoose_1.default.model('Emissions', exports.EmissionsSchema);
//# sourceMappingURL=Emissions.js.map